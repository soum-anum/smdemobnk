const express = require('express');
const authMiddleware = require('../middleware/auth');
const { statements, transactions } = require('../data/mockData');

const router = express.Router();

// Get all statements
router.get('/', authMiddleware, (req, res) => {
  try {
    const userId = req.userId;
    const userStatements = statements.filter(s => s.userId === userId);

    res.json({
      success: true,
      data: userStatements
    });
  } catch (error) {
    console.error('Statements error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error fetching statements' 
    });
  }
});

// Get statement by ID with transactions
router.get('/:id', authMiddleware, (req, res) => {
  try {
    const userId = req.userId;
    const { id } = req.params;

    const statement = statements.find(
      s => s.id === id && s.userId === userId
    );

    if (!statement) {
      return res.status(404).json({ 
        success: false,
        message: 'Statement not found' 
      });
    }

    // Get transactions for this statement period
    const statementTransactions = transactions.filter(t => 
      t.userId === userId &&
      t.date >= statement.startDate &&
      t.date <= statement.endDate
    );

    res.json({
      success: true,
      data: {
        ...statement,
        transactions: statementTransactions
      }
    });
  } catch (error) {
    console.error('Statement error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error fetching statement' 
    });
  }
});

// Generate custom statement by date range
router.post('/generate', authMiddleware, (req, res) => {
  try {
    const userId = req.userId;
    const { startDate, endDate } = req.body;

    if (!startDate || !endDate) {
      return res.status(400).json({ 
        success: false,
        message: 'Start date and end date are required' 
      });
    }

    // Get transactions in date range
    const rangeTransactions = transactions.filter(t => 
      t.userId === userId &&
      t.date >= startDate &&
      t.date <= endDate &&
      t.status === 'completed'
    );

    const totalDebit = rangeTransactions
      .filter(t => t.type === 'debit')
      .reduce((sum, t) => sum + parseFloat(t.amount), 0);

    const totalCredit = rangeTransactions
      .filter(t => t.type === 'credit')
      .reduce((sum, t) => sum + parseFloat(t.amount), 0);

    res.json({
      success: true,
      data: {
        startDate,
        endDate,
        totalTransactions: rangeTransactions.length,
        totalDebit: totalDebit.toFixed(2),
        totalCredit: totalCredit.toFixed(2),
        netAmount: (totalCredit - totalDebit).toFixed(2),
        transactions: rangeTransactions
      }
    });
  } catch (error) {
    console.error('Generate statement error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error generating statement' 
    });
  }
});

module.exports = router;

