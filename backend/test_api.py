"""
Test script to verify Flask backend API endpoints
Run this after starting the Flask server to test all endpoints
"""

import requests
import json

BASE_URL = "http://127.0.0.1:5000/api"

def print_response(title, response):
    """Helper to print API response"""
    print(f"\n{'='*50}")
    print(f"{title}")
    print(f"{'='*50}")
    print(f"Status: {response.status_code}")
    try:
        print(f"Response: {json.dumps(response.json(), indent=2)}")
    except:
        print(f"Response: {response.text}")

def test_auth():
    """Test authentication endpoints"""
    print("\n🔐 TESTING AUTH ENDPOINTS")
    
    # Test Registration
    register_data = {
        "name": "Test User",
        "email": "test@example.com",
        "mobile": "1234567890",
        "password": "test123"
    }
    response = requests.post(f"{BASE_URL}/auth/register", json=register_data)
    print_response("1. Register User", response)
    
    if response.status_code == 201:
        token = response.json().get('token')
        user_id = response.json().get('user', {}).get('id')
        return token, user_id
    
    # Test Login
    login_data = {
        "email": "test@example.com",
        "password": "test123"
    }
    response = requests.post(f"{BASE_URL}/auth/login", json=login_data)
    print_response("2. Login User", response)
    
    if response.status_code == 200:
        token = response.json().get('token')
        user_id = response.json().get('user', {}).get('id')
        return token, user_id
    
    return None, None

def test_user_profile(token):
    """Test user profile endpoints"""
    print("\n👤 TESTING USER PROFILE ENDPOINTS")
    
    headers = {"Authorization": f"Bearer {token}"}
    
    # Get Profile
    response = requests.get(f"{BASE_URL}/users/profile", headers=headers)
    print_response("1. Get User Profile", response)
    
    # Update Profile
    update_data = {"name": "Updated Test User"}
    response = requests.put(f"{BASE_URL}/users/profile", json=update_data, headers=headers)
    print_response("2. Update User Profile", response)

def test_matches(token):
    """Test matches endpoints"""
    print("\n⚽ TESTING MATCHES ENDPOINTS")
    
    headers = {"Authorization": f"Bearer {token}"} if token else {}
    
    # Get All Matches
    response = requests.get(f"{BASE_URL}/matches/", headers=headers)
    print_response("1. Get All Matches", response)
    
    # Get Upcoming Matches
    response = requests.get(f"{BASE_URL}/matches/?status=upcoming", headers=headers)
    print_response("2. Get Upcoming Matches", response)
    
    # Get Live Matches
    response = requests.get(f"{BASE_URL}/matches/?status=live", headers=headers)
    print_response("3. Get Live Matches", response)
    
    # Get My Matches
    if token:
        response = requests.get(f"{BASE_URL}/matches/my-matches", headers=headers)
        print_response("4. Get My Matches", response)

def test_leagues(token):
    """Test leagues endpoints"""
    print("\n🏆 TESTING LEAGUES ENDPOINTS")
    
    headers = {"Authorization": f"Bearer {token}"} if token else {}
    
    # Get All Leagues
    response = requests.get(f"{BASE_URL}/leagues/", headers=headers)
    print_response("1. Get All Leagues", response)
    
    # Get Free Leagues
    response = requests.get(f"{BASE_URL}/leagues/?filter=free", headers=headers)
    print_response("2. Get Free Leagues", response)
    
    # Get Paid Leagues
    response = requests.get(f"{BASE_URL}/leagues/?filter=paid", headers=headers)
    print_response("3. Get Paid Leagues", response)

def test_wallet(token):
    """Test wallet endpoints"""
    print("\n💰 TESTING WALLET ENDPOINTS")
    
    if not token:
        print("Skipping wallet tests - no token available")
        return
    
    headers = {"Authorization": f"Bearer {token}"}
    
    # Get Balance
    response = requests.get(f"{BASE_URL}/wallet/balance", headers=headers)
    print_response("1. Get Wallet Balance", response)
    
    # Get Transactions
    response = requests.get(f"{BASE_URL}/wallet/transactions", headers=headers)
    print_response("2. Get Transactions", response)
    
    # Add Money
    add_money_data = {"amount": 1000}
    response = requests.post(f"{BASE_URL}/wallet/add-money", json=add_money_data, headers=headers)
    print_response("3. Add Money to Wallet", response)

def main():
    """Run all tests"""
    print("\n" + "="*50)
    print("FANTASY11 BACKEND API TEST SUITE")
    print("="*50)
    print("\nMake sure the Flask server is running on http://127.0.0.1:5000")
    print("Press Enter to start testing...")
    input()
    
    try:
        # Test Auth
        token, user_id = test_auth()
        
        if token:
            # Test User Profile
            test_user_profile(token)
            
            # Test Matches
            test_matches(token)
            
            # Test Leagues
            test_leagues(token)
            
            # Test Wallet
            test_wallet(token)
        else:
            print("\n⚠️  Could not get authentication token. Some tests will be skipped.")
            test_matches(None)
            test_leagues(None)
        
        print("\n" + "="*50)
        print("✅ TESTING COMPLETE")
        print("="*50)
        
    except requests.exceptions.ConnectionError:
        print("\n❌ ERROR: Could not connect to Flask server.")
        print("Make sure the server is running: python app/main.py")
    except Exception as e:
        print(f"\n❌ ERROR: {str(e)}")

if __name__ == "__main__":
    main()

