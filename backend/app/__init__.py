from flask import Flask
from flask_cors import CORS
from app.utils.db import init_db

def create_app():
    app = Flask(__name__)
    app.config.from_object('app.config.Config')
    
    # Enable CORS
    CORS(app, resources={r"/api/*": {"origins": "*"}})
    
    # Initialize database
    init_db(app)
    
    # Register blueprints
    from app.routes.auth import auth_bp
    from app.routes.users import users_bp
    from app.routes.matches import matches_bp
    from app.routes.leagues import leagues_bp
    from app.routes.wallet import wallet_bp
    
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(users_bp, url_prefix='/api/users')
    app.register_blueprint(matches_bp, url_prefix='/api/matches')
    app.register_blueprint(leagues_bp, url_prefix='/api/leagues')
    app.register_blueprint(wallet_bp, url_prefix='/api/wallet')
    
    return app

