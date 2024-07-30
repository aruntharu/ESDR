// src/controllers/payment.js
const Payment = require('../models/payment');

const addPayment = async (req, res) => {
  try {
    const files = req.files.map(file => file.filename);
    req.body.paymentImages = files;
    req.body.paymentVerifiedStatus = 'pending'; // Set default status to pending
    await Payment.create(req.body);
    return res.json({ msg: 'Payment Added. Wait for Approval' });
  } catch (err) {
    return res.status(500).json({ msg: 'Error adding Payment', error: err });
  }
};

const getAllPayment = async (req, res) => {
  try {
    const paymentList = await Payment.find();
    return res.json(paymentList);
  } catch (err) {
    return res.status(500).json({ msg: 'Error fetching payments', error: err });
  }
};

const deletePaymentById = async (req, res) => {
  try {
    const payment = await Payment.findByIdAndDelete(req.params.id);
    return res.json({ msg: 'Payment deleted', payment });
  } catch (err) {
    return res.status(500).json({ msg: 'Error deleting payment', error: err });
  }
};

const getPaymentDetailsById = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);
    return res.json(payment);
  } catch (err) {
    return res.json({ msg: 'Unable to fetch payment details' });
  }
};

const approvePayment = async (req, res) => {
  try {
    await Payment.updateOne({ _id: req.body.paymentId }, { paymentVerifiedStatus: 'approved' });
    return res.json({ msg: 'Payment approved' });
  } catch (err) {
    return res.status(500).json({ msg: 'Error approving payment', error: err });
  }
};

const rejectPayment = async (req, res) => {
  try {
    await Payment.updateOne({ _id: req.body.paymentId }, { paymentVerifiedStatus: 'rejected' });
    return res.json({ msg: 'Payment rejected' });
  } catch (err) {
    return res.status(500).json({ msg: 'Error rejecting payment', error: err });
  }
};

module.exports = { addPayment, getAllPayment, deletePaymentById, getPaymentDetailsById, approvePayment, rejectPayment };
