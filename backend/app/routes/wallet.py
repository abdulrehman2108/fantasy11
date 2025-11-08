from flask import Blueprint, request, jsonify
from app.utils.jwt_helper import verify_token
from app.utils.db import get_db
from bson import ObjectId

wallet_bp = Blueprint('wallet', __name__)

def get_current_user():
    """Helper to get current user from token"""
    token = request.headers.get('Authorization', '').replace('Bearer ', '')
    if not token:
        return None
    user_id = verify_token(token)
    if user_id:
        return ObjectId(user_id)
    return None

@wallet_bp.route('/balance', methods=['GET'])
def get_balance():
    """Get wallet balance"""
    try:
        user_id = get_current_user()
        if not user_id:
            return jsonify({'error': 'Unauthorized'}), 401
        
        db = get_db()
        user = db.users.find_one({'_id': user_id})
        
        if not user:
            return jsonify({'error': 'User not found'}), 404
        
        return jsonify({
            'balance': user.get('wallet_balance', 0)
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@wallet_bp.route('/transactions', methods=['GET'])
def get_transactions():
    """Get wallet transactions"""
    try:
        user_id = get_current_user()
        if not user_id:
            return jsonify({'error': 'Unauthorized'}), 401
        
        db = get_db()
        transactions = list(db.transactions.find({'user_id': user_id}))
        
        for transaction in transactions:
            transaction['id'] = str(transaction['_id'])
            del transaction['_id']
            if 'created_at' in transaction and transaction['created_at']:
                if hasattr(transaction['created_at'], 'isoformat'):
                    transaction['created_at'] = transaction['created_at'].isoformat()
        
        return jsonify({'transactions': transactions}), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@wallet_bp.route('/add-money', methods=['POST'])
def add_money():
    """Add money to wallet"""
    try:
        user_id = get_current_user()
        if not user_id:
            return jsonify({'error': 'Unauthorized'}), 401
        
        data = request.get_json()
        amount = float(data.get('amount', 0))
        
        if amount <= 0:
            return jsonify({'error': 'Invalid amount'}), 400
        
        db = get_db()
        
        # Update balance
        db.users.update_one(
            {'_id': user_id},
            {'$inc': {'wallet_balance': amount}}
        )
        
        # Create transaction record
        from datetime import datetime
        db.transactions.insert_one({
            'user_id': user_id,
            'type': 'credit',
            'amount': amount,
            'description': 'Money added to wallet',
            'created_at': datetime.utcnow()
        })
        
        return jsonify({'message': 'Money added successfully'}), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

