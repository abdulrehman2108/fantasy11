from flask import Blueprint, request, jsonify
from app.utils.jwt_helper import verify_token
from app.utils.db import get_db
from app.utils.json_encoder import clean_document
from bson import ObjectId

users_bp = Blueprint('users', __name__)

def get_current_user():
    """Helper to get current user from token"""
    token = request.headers.get('Authorization', '').replace('Bearer ', '')
    if not token:
        return None
    user_id = verify_token(token)
    if user_id:
        return ObjectId(user_id)
    return None

@users_bp.route('/profile', methods=['GET'])
def get_profile():
    """Get user profile"""
    try:
        user_id = get_current_user()
        if not user_id:
            return jsonify({'error': 'Unauthorized'}), 401
        
        db = get_db()
        user = db.users.find_one({'_id': user_id})
        
        if not user:
            return jsonify({'error': 'User not found'}), 404
        
        # Clean user - convert ObjectIds and datetimes
        cleaned_user = clean_document(user)
        
        # Remove password if present
        if 'password' in cleaned_user:
            del cleaned_user['password']
        
        return jsonify({'user': cleaned_user}), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@users_bp.route('/profile', methods=['PUT'])
def update_profile():
    """Update user profile"""
    try:
        user_id = get_current_user()
        if not user_id:
            return jsonify({'error': 'Unauthorized'}), 401
        
        data = request.get_json()
        db = get_db()
        
        update_data = {}
        if 'name' in data:
            update_data['name'] = data['name']
        if 'email' in data:
            update_data['email'] = data['email']
        if 'mobile' in data:
            update_data['mobile'] = data['mobile']
        
        db.users.update_one(
            {'_id': user_id},
            {'$set': update_data}
        )
        
        return jsonify({'message': 'Profile updated successfully'}), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

