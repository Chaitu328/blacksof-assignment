require("dotenv").config();
const express = require("express");
const cors = require('cors')
const mongoose = require("mongoose");
const passport = require('passport');
const helmet = require('helmet');


const app = express();
const PORT = 8082;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

bodyParser = require('body-parser'),
app.use(bodyParser.urlencoded({ extended: true }));

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:8081',
  'https://blacksoff-frontend.vercel.app',
  
];

app.use(helmet());
app.use(cors({
  origin: allowedOrigins,
  credentials: true,  
}));

app.use(express.json());
app.use(passport.initialize());
require('./config/passport')(passport);

// Routes
const authRoutes = require('./routes/auth.routes');
const formRoutes = require('./routes/form.routes');
app.use('/api/auth', authRoutes);
app.use('/api', formRoutes);

app.listen(PORT, () => {
    console.log("Server Listening at", PORT);
  });
  