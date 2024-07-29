// src/controllers/payment.js
const Payment = require('../models/payment');

const addPayment = async (req, res) => {
  try {
    const files = req.files.map(file => file.filename);
    req.body.paymentImages = files; // Store the filenames of uploaded images
    req.body.paymentDate = new Date(req.body.paymentDate); // Convert to Date object
    await Payment.create(req.body);
    return res.json({ msg: 'Payment Added Wait For Approval' });
  } catch (err) {
    return res.status(500).json({ msg: 'Error adding Payment', error: err });
  }
};

const getAllPayment = async (req, res) => {
  const paymentList = await Payment.find();
  return res.json(paymentList);
};

const deletePaymentById = async (req, res) => {
  const paymentList = await Payment.findByIdAndDelete(req.params.id);
  return res.json(paymentList);
};

const getPaymentDetailsById = async (req, res) => {
  try {
    const paymentList = await Payment.findById(req.params.id);
    return res.json(paymentList);
  } catch (err) {
    return res.json({ msg: 'Unable to fetch' });
  }
};

module.exports = { addPayment, getAllPayment, deletePaymentById, getPaymentDetailsById };
