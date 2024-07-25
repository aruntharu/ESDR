// src/models/contact.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const contactSchema = new Schema({
  contactFullName: String,
  contactPhoneNumber: String,
  contactMail: String,
  contactMessage: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Contact = mongoose.model('Contact', contactSchema);
module.exports = Contact;
