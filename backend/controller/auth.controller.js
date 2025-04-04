const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  try {
    // console.log("Received login request");
    const { adminKey } = req.body;
    console.log("Request body:", req.body);
    
    // 1. Input validation
    if (!adminKey) {
      // console.log("Admin key missing"); 
      return res.status(400).json({ message: 'Admin key is required' });
    } 
    // console.log("Comparing provided adminKey with stored hash...");
    // 2. Direct bcrypt comparison
    const isMatch = await bcrypt.compare(adminKey, process.env.ADMIN_KEY_HASH);
    if (!isMatch) {
      // console.log("Invalid admin key");
      return res.status(401).json({ message: 'Invalid admin key' });
    }

    // 3. Generate JWT directly
      const token = jwt.sign(
        { admin: true },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
      // console.log("Token generated successfully");
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