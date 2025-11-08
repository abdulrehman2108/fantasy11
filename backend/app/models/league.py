from datetime import datetime

class League:
    def __init__(self, name, prize_pool, entry_fee, max_teams, popularity=0):
        self.name = name
        self.prize_pool = prize_pool
        self.entry_fee = entry_fee
        self.max_teams = max_teams
        self.teams_count = 0
        self.popularity = popularity
        self.created_at = datetime.utcnow()
    
    def to_dict(self):
        return {
            'name': self.name,
            'prize_pool': self.prize_pool,
            'entry_fee': self.entry_fee,
            'max_teams': self.max_teams,
            'teams_count': self.teams_count,
            'popularity': self.popularity,
            'created_at': self.created_at.isoformat()
        }

