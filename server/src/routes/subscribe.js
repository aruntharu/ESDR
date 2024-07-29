// src/routes/subscribe.js
const express = require('express');
const { addSubscribe, getAllSubscribe, deleteSubscribeById } = require('../controllers/subscribe');

const router = express.Router();

router.post('/subscribe', addSubscribe);
router.get('/subscribe', getAllSubscribe);
router.delete('/subscribe/:id', deleteSubscribeById);

module.exports = router;
