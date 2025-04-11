require('dotenv').config();
const express = require('express');
const { rateLimiter, blockedIPs } = require('./rateLimiter');
const cache = require('./cacheMiddleware');
const path = require('path');

const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(rateLimiter);

// Check if current IP is blocked
app.get('/api/blocked', (req, res) => {
  const ip = req.ip;
  res.json({ blocked: blockedIPs.has(ip), ip });
});

// API with cache
app.get('/api/data', cache, async (req, res) => {
  const data = {
    message: 'Hello from DevShield API',
    timestamp: new Date()
  };
  res.json(data);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
