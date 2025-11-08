import re

def validate_email(email):
    """
    Validate email format
    
    Args:
        email: Email string to validate
    
    Returns:
        Boolean indicating if email is valid
    """
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return bool(re.match(pattern, email))

def validate_mobile(mobile):
    """
    Validate mobile number (10 digits)
    
    Args:
        mobile: Mobile number string to validate
    
    Returns:
        Boolean indicating if mobile is valid
    """
    pattern = r'^[0-9]{10}$'
    return bool(re.match(pattern, str(mobile)))

def validate_password(password):
    """
    Validate password strength
    
    Args:
        password: Password string to validate
    
    Returns:
        Boolean indicating if password is valid
    """
    if len(password) < 6:
        return False
    return True

