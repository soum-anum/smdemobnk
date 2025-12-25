const express = require('express');
const authMiddleware = require('../middleware/auth');
const { users, transactions } = require('../data/mockData');

const router = express.Router();

// Get dashboard summary
router.get('/', authMiddleware, (req, res) => {
  try {
    const userId = req.userId;
    const user = users.find(u => u.id === userId);

    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: 'User not found' 
      });
    }

    // Get user's transactions
    const userTransactions = transactions.filter(t => t.userId === userId);

    // Calculate statistics
    const totalTransactions = userTransactions.length;
    const completedTransactions = userTransactions.filter(t => t.status === 'completed').length;
    const pendingTransactions = userTransactions.filter(t => t.status === 'pending').length;

    const totalDebit = userTransactions
      .filter(t => t.type === 'debit' && t.status === 'completed')
      .reduce((sum, t) => sum + parseFloat(t.amount), 0);

    const totalCredit = userTransactions
      .filter(t => t.type === 'credit' && t.status === 'completed')
      .reduce((sum, t) => sum + parseFloat(t.amount), 0);

    // Recent transactions (last 5)
    const recentTransactions = userTransactions.slice(0, 5);

    res.json({
      success: true,
      data: {
        user: {
          fullName: user.fullName,
          email: user.email,
          balance: user.balance
        },
        summary: {
          totalBalance: user.balance,
          totalTransactions,
          completedTransactions,
          pendingTransactions,
          totalDebit: totalDebit.toFixed(2),
          totalCredit: totalCredit.toFixed(2)
        },
        recentActivity: recentTransactions
      }
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error fetching dashboard data' 
    });
  }
});

module.exports = router;

