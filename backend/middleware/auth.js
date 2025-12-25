const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        success: false,
        message: 'Authentication required - No token provided' 
      });
    }

    const token = authHeader.substring(7);
    
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decoded.userId;
      req.userEmail = decoded.email;
      next();
    } catch (error) {
      return res.status(401).json({ 
        success: false,
        message: 'Invalid or expired token' 
      });
    }
  } catch (error) {
    return res.status(500).json({ 
      success: false,
      message: 'Authentication error' 
    });
  }
};

module.exports = authMiddleware;

