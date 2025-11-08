"""
Points calculation service for fantasy sports
"""

def calculate_player_points(player_stats):
    """
    Calculate points for a player based on their match statistics
    
    Args:
        player_stats: Dictionary containing player statistics
    
    Returns:
        Total points scored by the player
    """
    points = 0
    
    # Batting points
    runs = player_stats.get('runs', 0)
    points += runs * 1  # 1 point per run
    
    fours = player_stats.get('fours', 0)
    points += fours * 1  # 1 point per four
    
    sixes = player_stats.get('sixes', 0)
    points += sixes * 2  # 2 points per six
    
    # Milestone bonuses
    if runs >= 50:
        points += 8  # Half century bonus
    if runs >= 100:
        points += 16  # Century bonus
    
    # Bowling points
    wickets = player_stats.get('wickets', 0)
    points += wickets * 25  # 25 points per wicket
    
    maidens = player_stats.get('maidens', 0)
    points += maidens * 12  # 12 points per maiden over
    
    # Fielding points
    catches = player_stats.get('catches', 0)
    points += catches * 8  # 8 points per catch
    
    stumpings = player_stats.get('stumpings', 0)
    points += stumpings * 12  # 12 points per stumping
    
    run_outs = player_stats.get('run_outs', 0)
    points += run_outs * 6  # 6 points per run out
    
    return points

def calculate_team_points(team):
    """
    Calculate total points for a fantasy team
    
    Args:
        team: Dictionary containing team players and their stats
    
    Returns:
        Total points for the team
    """
    total_points = 0
    
    for player in team.get('players', []):
        player_points = calculate_player_points(player.get('stats', {}))
        total_points += player_points
    
    return total_points

