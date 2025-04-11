const redis = require('redis');
const client = redis.createClient({ url: process.env.REDIS_URL });

client.connect();

module.exports = async (req, res, next) => {
  const key = req.originalUrl;

  try {
    const data = await client.get(key);
    if (data) {
      return res.json({ from: 'cache', data: JSON.parse(data) });
    }

    // Override res.json to store response in cache
    const originalJson = res.json.bind(res);
    res.json = (body) => {
      client.setEx(key, 60, JSON.stringify(body)); // Cache for 60 seconds
      originalJson(body);
    };

    next();
  } catch (err) {
    console.error('Redis error:', err);
    next();
  }
};
