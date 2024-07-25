// src/routes/contact.js
const express = require('express');
const { addContact, getAllContact, deleteContactById } = require('../controllers/contact');

const router = express.Router();

router.post('/contact', addContact);
router.get('/contact', getAllContact);
router.delete('/contact/:id', deleteContactById);

module.exports = router;
