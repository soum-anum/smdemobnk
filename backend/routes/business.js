const express = require('express');
const authMiddleware = require('../middleware/auth');
const { businessInfo } = require('../data/mockData');

const router = express.Router();

// Get business information
router.get('/', authMiddleware, (req, res) => {
  try {
    const userId = req.userId;
    const userBusinessInfo = businessInfo[userId];

    if (!userBusinessInfo) {
      return res.status(404).json({ 
        success: false,
        message: 'Business information not found' 
      });
    }

    res.json({
      success: true,
      data: userBusinessInfo
    });
  } catch (error) {
    console.error('Business info error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error fetching business information' 
    });
  }
});

// Update business information
router.put('/', authMiddleware, (req, res) => {
  try {
    const userId = req.userId;
    const updates = req.body;

    // Update or create business info
    businessInfo[userId] = {
      ...businessInfo[userId],
      ...updates,
      updatedAt: new Date().toISOString()
    };

    res.json({
      success: true,
      message: 'Business information updated successfully',
      data: businessInfo[userId]
    });
  } catch (error) {
    console.error('Update business info error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error updating business information' 
    });
  }
});

module.exports = router;

