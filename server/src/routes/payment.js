// src/routes/payment.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const { addPayment, getAllPayment, deletePaymentById, getPaymentDetailsById, approvePayment, rejectPayment } = require('../controllers/payment');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/paymentImage/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

router.post('/payment', upload.array('paymentImages', 10), addPayment);
router.get('/payment', getAllPayment);
router.delete('/payment/:id', deletePaymentById);
router.get('/payment/:id', getPaymentDetailsById);
router.put('/payment/approve', approvePayment);
router.put('/payment/reject', rejectPayment);

module.exports = router;
