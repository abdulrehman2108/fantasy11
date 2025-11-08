from datetime import datetime

class Transaction:
    def __init__(self, user_id, transaction_type, amount, description):
        self.user_id = user_id
        self.type = transaction_type  # credit, debit
        self.amount = amount
        self.description = description
        self.created_at = datetime.utcnow()
    
    def to_dict(self):
        return {
            'user_id': self.user_id,
            'type': self.type,
            'amount': self.amount,
            'description': self.description,
            'created_at': self.created_at.isoformat()
        }

