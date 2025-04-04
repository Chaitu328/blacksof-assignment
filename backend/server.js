require("dotenv").config();
const express = require("express");
const cors = require('cors')
const mongoose = require("mongoose");
const passport = require('passport');
const helmet = require('helmet');


const DB_URI = process.env.MONGO_URI;

const app = express();
const PORT = 8082;

mongoose.set('strictQuery', false);
mongoose
  .connect(DB_URI)
  .then(() => console.log("Connected to DB at", DB_URI))
  .catch((error) => console.log("Failed to connect to DB\n", error));

bodyParser = require('body-parser'),
app.use(bodyParser.urlencoded({ extended: true }));

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:8081',
  
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
  