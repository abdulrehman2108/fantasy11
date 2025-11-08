from flask import Blueprint, request, jsonify
from app.utils.jwt_helper import verify_token
from app.utils.db import get_db
from app.utils.json_encoder import clean_document
from bson import ObjectId

leagues_bp = Blueprint('leagues', __name__)

def get_current_user():
    """Helper to get current user from token"""
    token = request.headers.get('Authorization', '').replace('Bearer ', '')
    if not token:
        return None
    user_id = verify_token(token)
    if user_id:
        return ObjectId(user_id)
    return None

@leagues_bp.route('/', methods=['GET'])
def get_leagues():
    """Get all leagues"""
    try:
        filter_type = request.args.get('filter', 'all')  # all, free, paid, popular
        sort_by = request.args.get('sort', 'prize')  # prize, teams, entry
        
        db = get_db()
        query = {}
        
        if filter_type == 'free':
            query['entry_fee'] = 0
        elif filter_type == 'paid':
            query['entry_fee'] = {'$gt': 0}
        elif filter_type == 'popular':
            query['popularity'] = {'$gte': 90}
        
        leagues = list(db.leagues.find(query))
        
        # Sort
        if sort_by == 'prize':
            leagues.sort(key=lambda x: x.get('prize_pool', 0), reverse=True)
        elif sort_by == 'teams':
            leagues.sort(key=lambda x: x.get('teams_count', 0), reverse=True)
        elif sort_by == 'entry':
            leagues.sort(key=lambda x: x.get('entry_fee', 0))
        
        # Clean all leagues - convert ObjectIds and datetimes
        cleaned_leagues = [clean_document(league) for league in leagues]
        
        return jsonify({'leagues': cleaned_leagues}), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@leagues_bp.route('/<league_id>/join', methods=['POST'])
def join_league(league_id):
    """Join a league"""
    try:
        user_id = get_current_user()
        if not user_id:
            return jsonify({'error': 'Unauthorized'}), 401
        
        db = get_db()
        league = db.leagues.find_one({'_id': ObjectId(league_id)})
        
        if not league:
            return jsonify({'error': 'League not found'}), 404
        
        # Check if user has enough balance
        user = db.users.find_one({'_id': user_id})
        if user['wallet_balance'] < league.get('entry_fee', 0):
            return jsonify({'error': 'Insufficient balance'}), 400
        
        # Deduct entry fee
        db.users.update_one(
            {'_id': user_id},
            {'$inc': {'wallet_balance': -league.get('entry_fee', 0)}}
        )
        
        # Add user to league
        from datetime import datetime
        db.league_participants.insert_one({
            'league_id': ObjectId(league_id),
            'user_id': user_id,
            'joined_at': datetime.utcnow()
        })
        
        return jsonify({'message': 'Successfully joined league'}), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

