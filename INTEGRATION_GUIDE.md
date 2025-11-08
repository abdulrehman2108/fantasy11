# Frontend ↔ Backend Integration Guide

## ✅ Completed Integration

### 1. Frontend API Client (`frontend/src/utils/api.ts`)
- ✅ Created comprehensive API utility functions
- ✅ Handles authentication tokens automatically
- ✅ Error handling and request formatting
- ✅ TypeScript interfaces for type safety

**Available Functions:**
- `loginUser()` - User login
- `signupUser()` - User registration
- `verifyToken()` - Token verification
- `getUserProfile()` - Get user profile
- `updateUserProfile()` - Update profile
- `getMatches()` - Get matches (with status filter)
- `getMatch()` - Get single match
- `getMyMatches()` - Get user's matches
- `getLeagues()` - Get leagues (with filter & sort)
- `joinLeague()` - Join a league
- `getWalletBalance()` - Get wallet balance
- `getTransactions()` - Get transactions
- `addMoney()` - Add money to wallet

### 2. Updated Frontend Pages

**Login Page (`frontend/src/app/login/page.tsx`)**
- ✅ Integrated with `loginUser()` API
- ✅ Error handling and display
- ✅ Token storage on success
- ✅ Auto-redirect to home

**Signup Page (`frontend/src/app/signup/page.tsx`)**
- ✅ Integrated with `signupUser()` API
- ✅ Error handling and display
- ✅ Token storage on success
- ✅ Auto-redirect to home

**Home Page (`frontend/src/app/home/page.tsx`)**
- ✅ Integrated with `getMatches()` API
- ✅ Loading states
- ✅ Error handling with retry
- ✅ Dynamic match data from backend

**My Matches Page (`frontend/src/app/mymatches/page.tsx`)**
- ✅ Integrated with `getMyMatches()` API
- ✅ Filter support (all/upcoming/live/completed)
- ✅ Loading and error states

**Leagues Page (`frontend/src/app/leagues/page.tsx`)**
- ✅ Integrated with `getLeagues()` API
- ✅ Filter and sort support
- ✅ `joinLeague()` integration
- ✅ Real-time league data

### 3. Backend Structure Verification

**✅ Flask Application Setup**
- `app/__init__.py` - App factory with CORS enabled
- `app/main.py` - Entry point
- All blueprints registered with `/api` prefix

**✅ Routes Implemented**
- `/api/auth/register` - User registration
- `/api/auth/login` - User login (email or mobile)
- `/api/auth/verify` - Token verification
- `/api/users/profile` - Get/Update profile
- `/api/matches/` - Get matches (with status filter)
- `/api/matches/<id>` - Get match by ID
- `/api/matches/my-matches` - Get user's matches
- `/api/leagues/` - Get leagues (with filter & sort)
- `/api/leagues/<id>/join` - Join league
- `/api/wallet/balance` - Get balance
- `/api/wallet/transactions` - Get transactions
- `/api/wallet/add-money` - Add money

**✅ Database Models**
- User model with wallet balance
- Match model with status tracking
- League model with prize pool
- Transaction model for wallet

**✅ Utilities**
- JWT token generation/verification
- Email/mobile validation
- MongoDB connection management
- Points calculation service
- Payment processing service

### 4. Testing

**Backend Test Script (`backend/test_api.py`)**
- Comprehensive test suite for all endpoints
- Tests authentication flow
- Tests protected endpoints
- Tests wallet operations

## 🚀 How to Test

### Step 1: Start Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python app/main.py
```

### Step 2: Test Backend API
In a new terminal:
```bash
cd backend
python test_api.py
```

This will test:
- ✅ User registration
- ✅ User login
- ✅ Token verification
- ✅ User profile
- ✅ Matches listing
- ✅ Leagues listing
- ✅ Wallet operations

### Step 3: Start Frontend
```bash
cd frontend
npm install
npm run dev
```

### Step 4: Test Integration
1. Open `http://localhost:3000`
2. Try registering a new user
3. Login with credentials
4. Browse matches (should fetch from backend)
5. View leagues (should fetch from backend)
6. Check wallet balance

## 📋 API Endpoints Summary

| Endpoint | Method | Auth Required | Description |
|----------|--------|---------------|-------------|
| `/api/auth/register` | POST | No | Register new user |
| `/api/auth/login` | POST | No | Login user |
| `/api/auth/verify` | POST | Yes | Verify token |
| `/api/users/profile` | GET | Yes | Get user profile |
| `/api/users/profile` | PUT | Yes | Update profile |
| `/api/matches/` | GET | No | Get matches |
| `/api/matches/<id>` | GET | No | Get match by ID |
| `/api/matches/my-matches` | GET | Yes | Get user's matches |
| `/api/leagues/` | GET | No | Get leagues |
| `/api/leagues/<id>/join` | POST | Yes | Join league |
| `/api/wallet/balance` | GET | Yes | Get balance |
| `/api/wallet/transactions` | GET | Yes | Get transactions |
| `/api/wallet/add-money` | POST | Yes | Add money |

## 🔧 Configuration

### Frontend Environment
Create `frontend/.env.local`:
```
NEXT_PUBLIC_API_URL=http://127.0.0.1:5000/api
```

### Backend Environment
Update `backend/.env`:
```
MONGO_URI=mongodb://localhost:27017/
DB_NAME=fantasy11
JWT_SECRET_KEY=your-secret-key
```

## ✅ Verification Checklist

- [x] Frontend API client created
- [x] Login page integrated with backend
- [x] Signup page integrated with backend
- [x] Home page fetches matches from API
- [x] My Matches page fetches user matches
- [x] Leagues page fetches and joins leagues
- [x] Backend routes properly structured
- [x] CORS enabled for frontend communication
- [x] JWT authentication implemented
- [x] MongoDB integration ready
- [x] Test script created
- [x] Error handling in place
- [x] Loading states implemented

## 🎯 Next Steps

1. **Add Sample Data**: Populate MongoDB with sample matches and leagues
2. **Password Hashing**: Implement bcrypt for password hashing
3. **Payment Gateway**: Integrate Razorpay/Stripe for payments
4. **Real-time Updates**: Add WebSocket for live match updates
5. **Team Creation**: Implement fantasy team creation logic
6. **Points Calculation**: Connect points service to match results

