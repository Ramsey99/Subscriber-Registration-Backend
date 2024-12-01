const Subscriber = require('../models/Subscriber');

// Create a new subscriber
exports.createSubscriber = async (req, res) => {
  try {
    const subscriber = new Subscriber(req.body);
    await subscriber.save();
    res.status(201).json({ message: 'Subscriber created successfully', subscriber });
  } catch (error) {
    console.error('Error creating subscriber:', error);
    res.status(500).json({ message: 'Failed to create subscriber' });
  }
};
