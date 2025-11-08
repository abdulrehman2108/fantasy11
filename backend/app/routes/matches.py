from flask import Blueprint, request, jsonify
from app.utils.jwt_helper import verify_token
from app.utils.db import get_db
from app.utils.json_encoder import clean_document
from datetime import datetime
from bson import ObjectId

matches_bp = Blueprint('matches', __name__)

def get_current_user():
    """Helper to get current user from token"""
    token = request.headers.get('Authorization', '').replace('Bearer ', '')
    if not token:
        return None
    user_id = verify_token(token)
    if user_id:
        return ObjectId(user_id)
    return None

@matches_bp.route('/', methods=['GET'])
def get_matches():
    """Get all matches"""
    try:
        status = request.args.get('status', 'all')  # all, upcoming, live, completed
        
        db = get_db()
        query = {}
        
        if status != 'all':
            query['status'] = status
        
        matches = list(db.matches.find(query))
        
        # Clean all matches - convert ObjectIds and datetimes
        cleaned_matches = [clean_document(match) for match in matches]
        
        return jsonify({'matches': cleaned_matches}), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@matches_bp.route('/<match_id>', methods=['GET'])
def get_match(match_id):
    """Get match by ID"""
    try:
        db = get_db()
        match = db.matches.find_one({'_id': ObjectId(match_id)})
        
        if not match:
            return jsonify({'error': 'Match not found'}), 404
        
        # Clean match - convert ObjectIds and datetimes
        cleaned_match = clean_document(match)
        
        return jsonify({'match': cleaned_match}), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@matches_bp.route('/my-matches', methods=['GET'])
def get_my_matches():
    """Get user's matches"""
    try:
        user_id = get_current_user()
        if not user_id:
            return jsonify({'error': 'Unauthorized'}), 401
        
        status = request.args.get('status', 'all')
        
        db = get_db()
        query = {'user_id': user_id}
        
        if status != 'all':
            query['status'] = status
        
        user_matches = list(db.user_matches.find(query))
        
        # Clean all user matches - convert ObjectIds and datetimes
        cleaned_matches = [clean_document(match) for match in user_matches]
        
        return jsonify({'matches': cleaned_matches}), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

