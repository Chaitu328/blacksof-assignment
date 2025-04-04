const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

const adminKey = 'Abracadabra'; // Your raw admin key
const saltRounds = 12;

bcrypt.hash(adminKey, saltRounds)
  .then(hash => {
    const envPath = path.join(__dirname, '../.env');
    const envContent = `ADMIN_KEY_HASH=${hash}\nt7GC1M22hc8Y2wy4cFFIR7pl7GbqvEPC`;
    
    fs.writeFileSync(envPath, envContent);
    console.log('✅ Admin hash saved to .env');
  })
  .catch(err => console.error('❌ Error:', err));