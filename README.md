# SMBank - Modern Banking Web Application

A full-stack banking web application with advanced filtering, secure authentication, and modern UI.

## 🌟 Features

### General Requirements ✅
- ✅ Modern tech stack: React + Node.js
- ✅ JWT Authentication with session handling
- ✅ Fully responsive design (desktop & mobile)
- ✅ Clear navigation between all pages
- ✅ External API integration
- ✅ Loading states, form validation, and error handling

### Pages Implemented

#### 1. Login Page ✅
- Email/username and password fields
- Form validation
- Authentication via API
- Redirect to Dashboard on success
- Demo account access

#### 2. Home / Dashboard Page ✅
- Summary cards (total balance, transactions, credits, debits)
- Recent activity feed
- Fetches data from Dashboard API
- Real-time statistics

#### 3. Transactions Page ✅ (Key Feature)
- **Country Filter Dropdown** with countries:
  - Japan
  - Singapore
  - India
  - China
  - Malaysia
- **City Filter (Dependent Dropdown)**
  - Dynamically changes based on selected country
  - Example: Japan → Tokyo, Osaka, Kyoto
- **Date Range Filter**
  - From Date input
  - To Date input
- **Action Buttons**
  - Apply button to apply all filters
  - Clear All button to reset filters
- Complete transactions table with:
  - Transaction ID
  - Date
  - Country
  - City
  - Amount
  - Status

#### 4. Statements Page ✅
- Monthly statements view
- Custom date-range statement generation
- Download statements as CSV
- Transaction summary

#### 5. Pay Now Page ✅
- Payment form with recipient, amount, description
- Real-time recipient validation
- Success/failure messages
- API-powered payment processing

#### 6. Business Information Page ✅
- Display and edit business details
- Business name, address, contact info
- Tax ID and registration number
- Save and update via API

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone or navigate to the project directory:**
   ```bash
   cd /home/som/Documents/work/smbank
   ```

2. **Install backend dependencies:**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies:**
   ```bash
   cd ../frontend
   npm install
   ```

### Running Locally

#### Start Backend Server (Terminal 1)
```bash
cd backend
npm start
```
Backend runs on: **http://localhost:5000**

#### Start Frontend Dev Server (Terminal 2)
```bash
cd frontend
npm run dev
```
Frontend runs on: **http://localhost:3000**

### Access the Application

Open your browser and go to: **http://localhost:3000**

## 🔐 Demo Account

Use these credentials to login:

- **Email/Username:** demo@smbank.com (or just "demo")
- **Password:** demo123

## 📁 Project Structure

```
smbank/
├── backend/                    # Node.js Backend
│   ├── data/
│   │   └── mockData.js        # Mock database with 100 transactions
│   ├── middleware/
│   │   └── auth.js            # JWT authentication middleware
│   ├── routes/
│   │   ├── auth.js            # Login/authentication routes
│   │   ├── dashboard.js       # Dashboard API
│   │   ├── transactions.js    # Transactions + locations API
│   │   ├── statements.js      # Statements API
│   │   ├── payment.js         # Payment processing API
│   │   └── business.js        # Business info API
│   ├── server.js              # Express server entry point
│   └── package.json
│
├── frontend/                   # React Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Layout.jsx     # Main layout with sidebar
│   │   │   ├── Layout.css
│   │   │   └── PrivateRoute.jsx
│   │   ├── pages/
│   │   │   ├── Login.jsx      # Login page
│   │   │   ├── Dashboard.jsx  # Dashboard/Home page
│   │   │   ├── Transactions.jsx  # Transactions with filters
│   │   │   ├── Statements.jsx # Statements page
│   │   │   ├── PayNow.jsx     # Payment page
│   │   │   ├── BusinessInfo.jsx  # Business info page
│   │   │   └── *.css          # Page styles
│   │   ├── services/
│   │   │   └── api.js         # API configuration & methods
│   │   ├── App.jsx            # Main app component
│   │   ├── main.jsx           # Entry point
│   │   └── index.css          # Global styles
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
└── README.md
```

## 🎯 Key Features Highlight

### Country-City Dependent Filtering
The Transactions page implements a sophisticated filtering system:

1. **Country Dropdown**
   - Select from: Japan, Singapore, India, China, Malaysia
   - When selected, it automatically populates the city dropdown

2. **City Dropdown**
   - Dynamically updates based on country selection
   - Disabled until a country is selected
   - Example mappings:
     - Japan → Tokyo, Osaka, Kyoto, Yokohama, Nagoya
     - Singapore → Singapore City, Jurong, Woodlands, Tampines
     - India → Mumbai, Delhi, Bangalore, Chennai, Kolkata, Hyderabad
     - China → Beijing, Shanghai, Guangzhou, Shenzhen, Chengdu
     - Malaysia → Kuala Lumpur, Penang, Johor Bahru, Malacca, Ipoh

3. **Date Range Filter**
   - From Date and To Date pickers
   - Filter transactions by date range

4. **Filter Actions**
   - **Apply button** - Applies all selected filters
   - **Clear All button** - Resets all filters to default

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `GET /api/auth/verify` - Verify JWT token

### Dashboard
- `GET /api/dashboard` - Get dashboard summary data

### Transactions
- `GET /api/transactions` - Get transactions (with filtering)
  - Query params: `country`, `city`, `fromDate`, `toDate`
- `GET /api/transactions/:id` - Get specific transaction
- `GET /api/transactions/meta/locations` - Get country-city mappings

### Statements
- `GET /api/statements` - Get all statements
- `GET /api/statements/:id` - Get statement with transactions
- `POST /api/statements/generate` - Generate custom statement

### Payments
- `POST /api/payment` - Process payment
- `POST /api/payment/validate` - Validate recipient

### Business
- `GET /api/business` - Get business information
- `PUT /api/business` - Update business information

## 🎨 UI/UX Features

- **Modern, clean design** with gradient accents
- **Responsive layout** - works on desktop, tablet, and mobile
- **Loading states** for all async operations
- **Form validation** with error messages
- **Success/error alerts** for user feedback
- **Smooth animations** and transitions
- **Accessible** form controls and navigation

## 📊 Mock Data

The application includes:
- 2 demo users
- 100 generated transactions across all countries
- 2 monthly statements
- Pre-configured business information
- Realistic data for testing all features

## 🔒 Security

- JWT token-based authentication
- Password hashing with bcryptjs
- Protected API routes
- Automatic token expiration handling
- Secure session management

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📝 Development

### Backend Development
```bash
cd backend
npm run dev  # Uses nodemon for auto-restart
```

### Frontend Development
```bash
cd frontend
npm run dev  # Vite with hot module replacement
```

## 🐛 Troubleshooting

### Backend won't start
- Make sure port 5000 is available
- Check if `.env` file exists in backend directory
- Run `npm install` in backend directory

### Frontend won't start
- Make sure port 3000 is available
- Run `npm install` in frontend directory
- Ensure backend is running first

### Can't login
- Verify backend is running on port 5000
- Check browser console for errors
- Use demo credentials: demo@smbank.com / demo123

### Filters not working
- Make sure you click "Apply Filters" button
- Check if backend API is responding
- Try "Clear All" to reset filters

## 📄 License

This project is for educational purposes.

## 🎉 Enjoy!

Your modern banking application is ready to run locally!

1. Start backend: `cd backend && npm start`
2. Start frontend: `cd frontend && npm run dev`
3. Open: http://localhost:3000
4. Login: demo@smbank.com / demo123

