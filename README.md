# 🏦 SM Bank - Modern Banking Web Application

A fully client-side banking web application built with React and Vite. No backend required - perfect for GitHub Pages hosting!

![Version](https://img.shields.io/badge/version-3.0.0-blue.svg)
![React](https://img.shields.io/badge/React-18.2.0-61DAFB.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## ✨ Features

### 🔐 Authentication
- Secure client-side login system
- Role-based access control (Admin/Customer)
- Session management with localStorage

### 📊 Dashboard
- Account balance overview
- Total transactions summary
- Recent activity feed
- Quick access cards

### 💳 Transactions
- View all transactions (500+ dummy records)
- Advanced filtering:
  - **Country Filter**: Single-select dropdown
  - **City Filter**: Multi-select checklist with search
  - **Date Range Filter**: From/To date pickers
- Real-time filter application
- Status badges (Completed/Pending/Failed)

### 📄 Statements
- Monthly account statements
- Statement details with:
  - Account information
  - Starting balance
  - Credits & Debits
  - Ending balance
- Transaction history per statement
- Download as CSV

### 💸 Pay Now
- Payment form with validation
- Recipient verification
- Amount and description fields
- Success/failure notifications

### 🏢 Business Information
- Three-card layout:
  - **Entity**: Company details
  - **Team & Contacts**: Personnel info
  - **Limits & Licenses**: Compliance data
- Read-only profile view

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/smbank.git
cd smbank

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will open at **http://localhost:3000**

## 👥 Test Credentials

| Role | Username | Password | Access |
|------|----------|----------|--------|
| **Admin** | smadmin | Smbank@1234 | Full access to all pages |
| **Admin** | demo@smbank.com | demo123 | Full access to all pages |
| **Customer** | smcust | Smbank@1234 | Pay Now page only |

## 📦 Build & Deploy

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

### Deploy to GitHub Pages

#### Option 1: Manual Deployment

```bash
# Install gh-pages
npm install --save-dev gh-pages

# Deploy
npm run deploy
```

#### Option 2: Automatic Deployment (GitHub Actions)

The repository includes a GitHub Actions workflow that automatically deploys to GitHub Pages on every push to `main`.

**Setup Steps:**

1. **Push your code to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/smbank.git
   git push -u origin main
   ```

2. **Enable GitHub Pages:**
   - Go to your repository on GitHub
   - Navigate to **Settings** → **Pages**
   - Under **Source**, select **GitHub Actions**

3. **The workflow will automatically:**
   - Build your application
   - Deploy to GitHub Pages
   - Your site will be live at: `https://YOUR_USERNAME.github.io/smbank/`

## 🛠️ Technology Stack

- **Frontend Framework**: React 18.2.0
- **Build Tool**: Vite 5.0.8
- **Routing**: React Router DOM 6.20.0
- **Icons**: Lucide React 0.294.0
- **Styling**: Pure CSS (no frameworks)
- **Data**: Client-side mock data

## 📁 Project Structure

```
smbank/
├── public/              # Static assets
│   └── .nojekyll       # GitHub Pages config
├── src/
│   ├── components/      # Reusable components
│   │   ├── Layout.jsx
│   │   └── PrivateRoute.jsx
│   ├── data/           # Mock data
│   │   └── mockData.js
│   ├── pages/          # Page components
│   │   ├── Login.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Transactions.jsx
│   │   ├── Statements.jsx
│   │   ├── PayNow.jsx
│   │   └── BusinessInfo.jsx
│   ├── services/       # Business logic
│   │   ├── authService.js
│   │   └── dataService.js
│   ├── App.jsx         # Main app component
│   ├── main.jsx        # Entry point
│   └── index.css       # Global styles
├── .github/
│   └── workflows/
│       └── deploy.yml  # GitHub Actions workflow
├── vite.config.js      # Vite configuration
├── package.json        # Dependencies & scripts
└── README.md          # This file
```

## 🎨 Features Breakdown

### Mock Data
- **4 Users**: 2 Admins, 1 Customer, 1 Demo
- **500 Transactions**: 125 per user
- **24 Statements**: 6 months per user
- **5 Countries**: Japan, Singapore, India, China, Malaysia
- **25+ Cities**: Distributed across countries

### Responsive Design
- Mobile-friendly layout
- Adaptive navigation
- Touch-optimized controls

### User Experience
- Loading states
- Error handling
- Form validation
- Success/failure notifications
- Smooth transitions

## 🔧 Configuration

### Vite Configuration

The `vite.config.js` is configured for GitHub Pages:

```javascript
export default defineConfig({
  base: '/smbank/',  // Change this to your repo name
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
});
```

**Important**: Update the `base` path to match your GitHub repository name!

## 📝 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run deploy` | Deploy to GitHub Pages |

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

MIT License - feel free to use this project for learning or personal use.

## 🤝 Contributing

This is a demo project, but feel free to fork and customize it for your needs!

## 📧 Support

For issues or questions, please open an issue on GitHub.

---

**Built with ❤️ using React + Vite**

**Live Demo**: [https://YOUR_USERNAME.github.io/smbank/](https://YOUR_USERNAME.github.io/smbank/)
