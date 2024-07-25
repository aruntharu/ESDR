// src/routes/esdr.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const { addEsdr, getAllEsdr, deleteEsdrById, getEsdrDetailsById } = require('../controllers/esdr');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/esdrImage/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

router.post('/esdr', upload.single('esdrImage'), addEsdr);
router.get('/esdr', getAllEsdr);
router.delete('/esdr/:id', deleteEsdrById);
router.get('/esdr/:id', getEsdrDetailsById);

module.exports = router;
