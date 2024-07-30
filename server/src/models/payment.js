const mongoose = require('mongoose');
const { Schema } = mongoose;

const paymentSchema = new Schema({
  userId: { type: String, required: true },
  paymentImages: [String], // Array of strings to store multiple image filenames
  paymentVerifiedStatus: {
    type: String,
    enum: ['unVerified', 'pending', 'approved', 'rejected'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Payment = mongoose.model('Payment', paymentSchema);
module.exports = Payment;
