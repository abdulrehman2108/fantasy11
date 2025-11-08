# Quick Start Guide

## Backend Setup & Testing

### 1. Start MongoDB
Make sure MongoDB is installed and running on your system.

### 2. Install Dependencies
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### 3. Configure Environment
Copy `.env` file and update with your MongoDB connection string if needed.

### 4. Start Flask Server
```bash
python app/main.py
```

Server will start on `http://127.0.0.1:5000`

### 5. Test the API
In a new terminal:
```bash
cd backend
python test_api.py
```

This will test all endpoints:
- ✅ Authentication (Register/Login)
- ✅ User Profile
- ✅ Matches
- ✅ Leagues
- ✅ Wallet

## Frontend Setup

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Configure API URL
Create `.env.local` file:
```
NEXT_PUBLIC_API_URL=http://127.0.0.1:5000/api
```

### 3. Start Development Server
```bash
npm run dev
```

Frontend will be available at `http://localhost:3000`

## Testing the Integration

1. Start backend server first
2. Start frontend server
3. Open browser to `http://localhost:3000`
4. Try registering a new user
5. Login with credentials
6. Browse matches and leagues

## Common Issues

**Backend won't start:**
- Check MongoDB is running
- Verify `.env` file exists
- Check port 5000 is not in use

**Frontend can't connect to backend:**
- Verify backend is running on port 5000
- Check CORS is enabled in backend
- Verify `NEXT_PUBLIC_API_URL` in frontend `.env.local`

**API returns 401 Unauthorized:**
- Check token is being sent in Authorization header
- Verify token hasn't expired
- Re-login to get new token

