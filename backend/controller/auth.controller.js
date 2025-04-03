const authService = require('../services/auth.service');

exports.login = async (req, res) => {
  try {
    // 1. Get adminKey from request body
    const { adminKey } = req.body;
    
    if (!adminKey) {
      return res.status(400).json({ message: 'Admin key is required' });
    }

    // 2. Call service layer
    const token = await authService.authenticateAdmin(adminKey);
    
    // 3. Return token
    res.json({ 
      success: true,
      token,
      expiresIn: 3600 // 1 hour in seconds
    });
    
  } catch (error) {
    console.error('Login Error:', error);
    res.status(401).json({ 
      success: false,
      message: error.message || 'Authentication failed'
    });
  }
};