const express = require("express");
const { createSubscriber, verifyEmail } = require("../controllers/subscriberController");
const router = express.Router();

// Route to create a subscriber
router.post("/", createSubscriber); // Ensure createSubscriber is correctly imported

// Route to verify email
router.get("/api/verify-email", verifyEmail); // Update to match frontend route

module.exports = router;
