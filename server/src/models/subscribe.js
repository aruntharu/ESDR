// src/models/contact.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const contactSchema = new Schema({
 fullName: String,
  email: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Subscribe = mongoose.model('Subscribe', contactSchema);
module.exports = Subscribe;
