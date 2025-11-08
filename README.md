# Fantasy11 - Fantasy Sports Platform

A full-stack fantasy sports application with Next.js frontend and Flask backend.

## Project Structure

```
fantasy11/
├── frontend/              # Next.js App (UI/UX)
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   ├── styles/
│   │   └── utils/
│   ├── public/
│   ├── package.json
│   └── tailwind.config.js
│
└── backend/              # Flask REST API
    ├── app/
    │   ├── __init__.py
    │   ├── routes/
    │   ├── models/
    │   ├── services/
    │   ├── utils/
    │   └── main.py
    ├── venv/
    ├── requirements.txt
    └── .env
```

## Getting Started

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Run development server:
```bash
npm run dev
```

Frontend will be available at `http://localhost:3000`

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Create virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Configure environment variables in `.env` file

5. Make sure MongoDB is running

6. Run the Flask server:
```bash
python app/main.py
```

Backend API will be available at `http://localhost:5000`

## Features

- User authentication (Login/Signup)
- Match listings (Upcoming/Live)
- League management
- Wallet system
- Points calculation
- Payment processing

## Tech Stack

**Frontend:**
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS

**Backend:**
- Flask
- MongoDB
- JWT Authentication
- RESTful API
