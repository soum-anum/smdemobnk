# 🚀 Quick Start Guide - SMBank

## Installation (One-Time Setup)

### Step 1: Install Backend Dependencies
```bash
cd backend
npm install
```

### Step 2: Install Frontend Dependencies
```bash
cd ../frontend
npm install
```

## Running the Application

### Terminal 1 - Start Backend
```bash
cd backend
npm start
```
✅ Backend running at: http://localhost:5000

### Terminal 2 - Start Frontend
```bash
cd frontend
npm run dev
```
✅ Frontend running at: http://localhost:3000

## Access & Login

1. Open browser: **http://localhost:3000**
2. Login credentials:
   - **Email:** demo@smbank.com (or just "demo")
   - **Password:** demo123

## Key Features to Try

### 1. Dashboard
- View account balance
- See transaction statistics
- Check recent activity

### 2. Transactions (Main Feature!)
- **Country Filter:** Select from Japan, Singapore, India, China, Malaysia
- **City Filter:** Automatically updates based on country
  - Example: Select Japan → See Tokyo, Osaka, Kyoto
- **Date Filters:** From Date and To Date
- **Actions:**
  - Click "Apply Filters" to filter
  - Click "Clear All" to reset

### 3. Statements
- View monthly statements
- Generate custom statements by date range
- Download as CSV

### 4. Pay Now
- Enter recipient (try: john@smbank.com)
- System validates recipient automatically
- Enter amount and description
- Send payment instantly

### 5. Business Info
- View business details
- Update company information
- Save changes

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Backend won't start | Check port 5000 is free |
| Frontend won't start | Check port 3000 is free |
| Can't login | Use demo@smbank.com / demo123 |
| Filters not working | Click "Apply Filters" button |

## Tech Stack
- **Backend:** Node.js + Express + JWT
- **Frontend:** React + Vite
- **Styling:** Custom CSS with modern design
- **Data:** Mock API with 100 transactions

## File Structure (Quick Reference)
```
smbank/
├── backend/           # Node.js API
│   ├── routes/        # API endpoints
│   ├── data/          # Mock data
│   └── server.js      # Entry point
└── frontend/          # React App
    └── src/
        ├── pages/     # All 6 pages
        └── services/  # API calls
```

---

**Need Help?** Check the main README.md for detailed information!

