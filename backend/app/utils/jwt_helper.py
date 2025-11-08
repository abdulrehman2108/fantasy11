import jwt
import os
from datetime import datetime, timedelta

SECRET_KEY = os.environ.get('JWT_SECRET_KEY', 'your-secret-key-change-in-production')
ALGORITHM = 'HS256'
EXPIRATION_HOURS = 24

def generate_token(user_id):
    """
    Generate JWT token for user
    
    Args:
        user_id: User ID
    
    Returns:
        JWT token string
    """
    payload = {
        'user_id': str(user_id),
        'exp': datetime.utcnow() + timedelta(hours=EXPIRATION_HOURS),
        'iat': datetime.utcnow()
    }
    
    token = jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)
    return token

def verify_token(token):
    """
    Verify and decode JWT token
    
    Args:
        token: JWT token string
    
    Returns:
        User ID if token is valid, None otherwise
    """
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload.get('user_id')
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None

