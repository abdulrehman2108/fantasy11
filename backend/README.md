# Fantasy11 Backend API

Flask REST API for Fantasy11 application.

## Setup

1. Create virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Configure environment variables in `.env` file:
```env
FLASK_ENV=development
FLASK_DEBUG=True
SECRET_KEY=your-secret-key-change-in-production
MONGO_URI=mongodb://localhost:27017/
DB_NAME=fantasy11
JWT_SECRET_KEY=your-jwt-secret-key-change-in-production
```

4. Make sure MongoDB is running:
```bash
# Install MongoDB if not installed
# Start MongoDB service
```

5. Run the application:
```bash
python app/main.py
```

The API will be available at `http://127.0.0.1:5000`

## Testing the API

Run the test script to verify all endpoints:
```bash
python test_api.py
```

Make sure the Flask server is running before executing the test script.

## API Endpoints

### Authentication (`/api/auth`)
- `POST /api/auth/register` - User registration
  - Body: `{ "name": "string", "email": "string", "mobile": "string", "password": "string" }`
  - Returns: `{ "message": "string", "token": "string", "user": {...} }`

- `POST /api/auth/login` - User login
  - Body: `{ "email": "string" OR "mobile": "string", "password": "string" }`
  - Returns: `{ "message": "string", "token": "string", "user": {...} }`

- `POST /api/auth/verify` - Verify JWT token
  - Headers: `Authorization: Bearer <token>`
  - Returns: `{ "valid": true, "user_id": "string" }`

### Users (`/api/users`)
- `GET /api/users/profile` - Get user profile
  - Headers: `Authorization: Bearer <token>`
  - Returns: `{ "user": {...} }`

- `PUT /api/users/profile` - Update user profile
  - Headers: `Authorization: Bearer <token>`
  - Body: `{ "name": "string", "email": "string", "mobile": "string" }`
  - Returns: `{ "message": "string" }`

### Matches (`/api/matches`)
- `GET /api/matches/` - Get all matches
  - Query params: `?status=upcoming|live|completed` (optional)
  - Returns: `{ "matches": [...] }`

- `GET /api/matches/<match_id>` - Get match by ID
  - Returns: `{ "match": {...} }`

- `GET /api/matches/my-matches` - Get user's matches
  - Headers: `Authorization: Bearer <token>`
  - Query params: `?status=all|upcoming|live|completed` (optional)
  - Returns: `{ "matches": [...] }`

### Leagues (`/api/leagues`)
- `GET /api/leagues/` - Get all leagues
  - Query params: `?filter=all|free|paid|popular` (optional)
  - Query params: `?sort=prize|teams|entry` (optional)
  - Returns: `{ "leagues": [...] }`

- `POST /api/leagues/<league_id>/join` - Join a league
  - Headers: `Authorization: Bearer <token>`
  - Returns: `{ "message": "string" }`

### Wallet (`/api/wallet`)
- `GET /api/wallet/balance` - Get wallet balance
  - Headers: `Authorization: Bearer <token>`
  - Returns: `{ "balance": number }`

- `GET /api/wallet/transactions` - Get transactions
  - Headers: `Authorization: Bearer <token>`
  - Returns: `{ "transactions": [...] }`

- `POST /api/wallet/add-money` - Add money to wallet
  - Headers: `Authorization: Bearer <token>`
  - Body: `{ "amount": number }`
  - Returns: `{ "message": "string" }`

## CORS Configuration

CORS is enabled for all `/api/*` routes to allow frontend communication.

## Database

The application uses MongoDB. Make sure MongoDB is installed and running.

Collections:
- `users` - User accounts
- `matches` - Match data
- `leagues` - League/contest data
- `user_matches` - User's joined matches
- `league_participants` - League participants
- `transactions` - Wallet transactions

## Authentication

JWT tokens are used for authentication. Include the token in the Authorization header:
```
Authorization: Bearer <your-token>
```

Tokens expire after 24 hours by default.
