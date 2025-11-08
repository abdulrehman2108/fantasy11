from pymongo import MongoClient
from flask import current_app

db_client = None
db = None

def init_db(app):
    """Initialize database connection"""
    global db_client, db
    
    mongo_uri = app.config.get('MONGO_URI', 'mongodb://localhost:27017/')
    db_name = app.config.get('DB_NAME', 'fantasy11')
    
    db_client = MongoClient(mongo_uri)
    db = db_client[db_name]
    
    # Create indexes
    db.users.create_index('email', unique=True)
    db.users.create_index('mobile', unique=True)
    db.matches.create_index('status')
    db.leagues.create_index('entry_fee')
    
    return db

def get_db():
    """Get database instance"""
    global db
    if db is None:
        raise Exception("Database not initialized. Call init_db() first.")
    return db

def close_db():
    """Close database connection"""
    global db_client
    if db_client:
        db_client.close()

