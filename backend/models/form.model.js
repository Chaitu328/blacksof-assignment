const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'Full name is required'],
        trim: true
      },
      email: {
        type: String,
        required: [true, 'Email is required'],
        lowercase: true,
        trim: true
      },
      subject: {
        type: String,
        required: [true, 'Subject is required'],
        trim: true,
        maxlength: 100
      },
      message: {
        type: String,
        required: [true, 'Message is required'],
        trim: true,
        maxlength: 1000
      },
      createdAt: {
        type: Date,
        default: Date.now
      }
});

module.exports = mongoose.model('Form', formSchema);