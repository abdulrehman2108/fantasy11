from datetime import datetime

class Match:
    def __init__(self, team1, team2, match_date, status='upcoming'):
        self.team1 = team1
        self.team2 = team2
        self.match_date = match_date
        self.status = status  # upcoming, live, completed
        self.score = None
        self.created_at = datetime.utcnow()
    
    def to_dict(self):
        return {
            'team1': self.team1,
            'team2': self.team2,
            'match_date': self.match_date.isoformat() if isinstance(self.match_date, datetime) else self.match_date,
            'status': self.status,
            'score': self.score,
            'created_at': self.created_at.isoformat()
        }

