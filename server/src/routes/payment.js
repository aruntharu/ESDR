// src/routes/payment.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const { addPayment, getAllPayment, deletePaymentById, getPaymentDetailsById } = require('../controllers/payment');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/paymentImage/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

router.post('/payment', upload.array('paymentImages', 10), addPayment); // Allow up to 10 files
router.get('/payment', getAllPayment);
router.delete('/payment/:id', deletePaymentById);
router.get('/payment/:id', getPaymentDetailsById);

module.exports = router;
