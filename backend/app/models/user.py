from datetime import datetime
from bson import ObjectId

class User:
    def __init__(self, name, email, mobile, password, wallet_balance=0.0):
        self.name = name
        self.email = email
        self.mobile = mobile
        self.password = password
        self.wallet_balance = wallet_balance
        self.created_at = datetime.utcnow()
    
    def to_dict(self):
        return {
            'name': self.name,
            'email': self.email,
            'mobile': self.mobile,
            'wallet_balance': self.wallet_balance,
            'created_at': self.created_at.isoformat()
        }
    
    @staticmethod
    def from_dict(data):
        user = User(
            name=data.get('name'),
            email=data.get('email'),
            mobile=data.get('mobile'),
            password=data.get('password'),
            wallet_balance=data.get('wallet_balance', 0.0)
        )
        return user

