const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const db = require('./config/db');
const subscriberRoutes = require('./routes/subscriberRoutes');

// Load environment variables
dotenv.config();

const app = express();

// CORS Configuration
const allowedOrigins = [
    process.env.FRONTURL || 'http://localhost:5173',
];

app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
    })
);

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root route
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Subscriber routes
app.use('/api/subscribers', subscriberRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).send('Unauthorized');
    } else if (err.message === 'Not allowed by CORS') {
        res.status(403).send('CORS Error: Access not allowed');
    } else {
        res.status(500).send('Internal Server Error');
    }
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
