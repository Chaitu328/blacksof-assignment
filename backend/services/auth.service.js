const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
  authenticateAdmin: async (adminKey) => {
    try {
      // Compare submitted key with stored hash
      const isMatch = await bcrypt.compare(adminKey, process.env.ADMIN_KEY_HASH);
      
      if (!isMatch) {
        throw new Error('Invalid admin key');
      }

      // Generate JWT
      return jwt.sign(
        { admin: true },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
    } catch (error) {
      throw new Error('Authentication failed');
    }
  }
};