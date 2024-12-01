const express = require('express');
const { createSubscriber } = require('../controllers/subscriberController');
const router = express.Router();

// Route to create a subscriber
router.post('/', createSubscriber);

module.exports = router;
