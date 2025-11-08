from flask import Blueprint, request, jsonify
from app.models.user import User
from app.utils.jwt_helper import generate_token, verify_token
from app.utils.validations import validate_email, validate_mobile
from app.utils.db import get_db
from datetime import datetime

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    """User registration endpoint"""
    try:
        data = request.get_json()
        
        # Validation
        if not data.get('email') or not validate_email(data.get('email')):
            return jsonify({'error': 'Invalid email'}), 400
        
        if not data.get('password') or len(data.get('password')) < 6:
            return jsonify({'error': 'Password must be at least 6 characters'}), 400
        
        if not data.get('name'):
            return jsonify({'error': 'Name is required'}), 400
        
        if not data.get('mobile') or not validate_mobile(data.get('mobile')):
            return jsonify({'error': 'Invalid mobile number'}), 400
        
        # Check if user exists
        db = get_db()
        existing_user = db.users.find_one({'email': data['email']})
        if existing_user:
            return jsonify({'error': 'User already exists'}), 400
        
        # Create new user
        user_data = {
            'name': data['name'],
            'email': data['email'],
            'mobile': data['mobile'],
            'password': data['password'],  # In production, hash this
            'wallet_balance': 0.0,
            'created_at': datetime.utcnow()
        }
        
        result = db.users.insert_one(user_data)
        user_id = str(result.inserted_id)
        user_data['id'] = user_id
        del user_data['password']
        user_data['created_at'] = user_data['created_at'].isoformat()
        
        # Generate token
        token = generate_token(user_id)
        
        return jsonify({
            'message': 'User registered successfully',
            'token': token,
            'user': user_data
        }), 201
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@auth_bp.route('/login', methods=['POST'])
def login():
    """User login endpoint"""
    try:
        data = request.get_json()
        email_or_mobile = data.get('email') or data.get('mobile')
        password = data.get('password')
        
        if not email_or_mobile or not password:
            return jsonify({'error': 'Email/mobile and password are required'}), 400
        
        db = get_db()
        user = db.users.find_one({
            '$or': [
                {'email': email_or_mobile},
                {'mobile': email_or_mobile}
            ],
            'password': password
        })
        
        if not user:
            return jsonify({'error': 'Invalid credentials'}), 401
        
        user_id = str(user['_id'])
        user['id'] = user_id
        del user['_id']
        if 'password' in user:
            del user['password']
        if 'created_at' in user and user['created_at']:
            user['created_at'] = user['created_at'].isoformat() if hasattr(user['created_at'], 'isoformat') else str(user['created_at'])
        
        token = generate_token(user_id)
        
        return jsonify({
            'message': 'Login successful',
            'token': token,
            'user': user
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@auth_bp.route('/verify', methods=['POST'])
def verify():
    """Verify JWT token"""
    try:
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({'error': 'Token required'}), 401
        
        token = token.replace('Bearer ', '')
        user_id = verify_token(token)
        
        if not user_id:
            return jsonify({'error': 'Invalid token'}), 401
        
        return jsonify({'valid': True, 'user_id': user_id}), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

