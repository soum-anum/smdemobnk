const express = require('express');
const authMiddleware = require('../middleware/auth');
const { transactions, countryCityMap } = require('../data/mockData');

const router = express.Router();

// Get all transactions with filtering
router.get('/', authMiddleware, (req, res) => {
  try {
    const userId = req.userId;
    const { country, city, fromDate, toDate } = req.query;

    // Get user's transactions
    let userTransactions = transactions.filter(t => t.userId === userId);

    // Apply country filter
    if (country && country !== 'all') {
      userTransactions = userTransactions.filter(t => t.country === country);
    }

    // Apply city filter
    if (city && city !== 'all') {
      userTransactions = userTransactions.filter(t => t.city === city);
    }

    // Apply date range filter
    if (fromDate) {
      userTransactions = userTransactions.filter(t => t.date >= fromDate);
    }

    if (toDate) {
      userTransactions = userTransactions.filter(t => t.date <= toDate);
    }

    res.json({
      success: true,
      data: {
        transactions: userTransactions,
        total: userTransactions.length
      }
    });
  } catch (error) {
    console.error('Transactions error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error fetching transactions' 
    });
  }
});

// Get transaction by ID
router.get('/:id', authMiddleware, (req, res) => {
  try {
    const userId = req.userId;
    const { id } = req.params;

    const transaction = transactions.find(
      t => t.id === id && t.userId === userId
    );

    if (!transaction) {
      return res.status(404).json({ 
        success: false,
        message: 'Transaction not found' 
      });
    }

    res.json({
      success: true,
      data: transaction
    });
  } catch (error) {
    console.error('Transaction error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error fetching transaction' 
    });
  }
});

// Get countries and cities
router.get('/meta/locations', authMiddleware, (req, res) => {
  try {
    res.json({
      success: true,
      data: countryCityMap
    });
  } catch (error) {
    console.error('Locations error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error fetching locations' 
    });
  }
});

module.exports = router;

