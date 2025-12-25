const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/dashboard', require('./routes/dashboard'));
app.use('/api/transactions', require('./routes/transactions'));
app.use('/api/statements', require('./routes/statements'));
app.use('/api/payment', require('./routes/payment'));
app.use('/api/business', require('./routes/business'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    success: false,
    message: 'Route not found' 
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ 
    success: false,
    message: 'Internal server error' 
  });
});

// Start server
app.listen(PORT, () => {
  console.log('='.repeat(50));
  console.log(`🚀 SMBank Server Started`);
  console.log(`📡 Server: http://localhost:${PORT}`);
  console.log(`🏥 Health: http://localhost:${PORT}/api/health`);
  console.log(`📧 Demo Login: demo@smbank.com / demo123`);
  console.log('='.repeat(50));
});

