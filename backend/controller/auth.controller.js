const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  try {
    const { adminKey } = req.body;
    
    // 1. Input validation
    if (!adminKey) {
      return res.status(400).json({ message: 'Admin key is required' });
    }

    // 2. Direct bcrypt comparison
    const isMatch = await bcrypt.compare(adminKey, process.env.ADMIN_KEY_HASH);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid admin key' });
    }

    // 3. Generate JWT directly
      const token = jwt.sign(
        { admin: true },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

    res.json({ 
      success: true,
      token,
      expiresIn: 3600 // 1 hour
    });
    
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Authentication failed' 
    });
  }
};