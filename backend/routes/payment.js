const express = require('express');
const authMiddleware = require('../middleware/auth');
const { users, transactions } = require('../data/mockData');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

// Process payment
router.post('/', authMiddleware, (req, res) => {
  try {
    const userId = req.userId;
    const { recipient, amount, description } = req.body;

    // Validation
    if (!recipient || !amount || !description) {
      return res.status(400).json({ 
        success: false,
        message: 'Recipient, amount, and description are required' 
      });
    }

    const paymentAmount = parseFloat(amount);

    if (isNaN(paymentAmount) || paymentAmount <= 0) {
      return res.status(400).json({ 
        success: false,
        message: 'Invalid amount' 
      });
    }

    const user = users.find(u => u.id === userId);

    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: 'User not found' 
      });
    }

    // Check balance
    if (user.balance < paymentAmount) {
      return res.status(400).json({ 
        success: false,
        message: 'Insufficient balance' 
      });
    }

    // Create transaction
    const newTransaction = {
      id: `TXN${Date.now()}`,
      userId: userId,
      date: new Date().toISOString().split('T')[0],
      country: 'Singapore',
      city: 'Singapore City',
      amount: paymentAmount.toFixed(2),
      status: 'completed',
      description: description,
      type: 'debit',
      recipient: recipient
    };

    // Add to transactions
    transactions.unshift(newTransaction);

    // Update balance
    user.balance -= paymentAmount;

    res.json({
      success: true,
      message: 'Payment processed successfully',
      data: {
        transaction: newTransaction,
        newBalance: user.balance
      }
    });
  } catch (error) {
    console.error('Payment error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error processing payment' 
    });
  }
});

// Validate recipient
router.post('/validate', authMiddleware, (req, res) => {
  try {
    const { recipient } = req.body;

    if (!recipient) {
      return res.status(400).json({ 
        success: false,
        message: 'Recipient is required' 
      });
    }

    // Simulate validation (check if recipient exists)
    const recipientUser = users.find(u => 
      u.email === recipient || u.username === recipient
    );

    if (recipientUser) {
      res.json({
        success: true,
        valid: true,
        message: 'Recipient found',
        recipientName: recipientUser.fullName
      });
    } else {
      // Allow any recipient for demo purposes
      res.json({
        success: true,
        valid: true,
        message: 'External recipient',
        recipientName: recipient
      });
    }
  } catch (error) {
    console.error('Validation error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error validating recipient' 
    });
  }
});

module.exports = router;

