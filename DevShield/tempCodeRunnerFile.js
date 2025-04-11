require('dotenv').config();
const express = require('express');
const rateLimiter = require('./rateLimiter');
const cache = require('./cacheMiddleware');
const path = require('path');

// Serve frontend
app.use(express.static(path.join(__dirname, 'public')));
const app = express();
app.use(rateLimiter);

app.get('/api/data', cache, async (req, res) => {
  const data = { message: 'Hello from DevShield API', timestamp: new Date() };
  res.json(data);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
