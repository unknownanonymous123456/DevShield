const rateLimitStore = new Map();
const blockedIPs = new Set();

function rateLimiter(req, res, next) {
  const ip = req.ip;

  if (blockedIPs.has(ip)) {
    return res.status(429).json({ error: 'Too many requests', blocked: true, ip });
  }

  const count = rateLimitStore.get(ip) || 0;

  if (count >= 5) {
    blockedIPs.add(ip);
    return res.status(429).json({ error: 'Too many requests', blocked: true, ip });
  }

  rateLimitStore.set(ip, count + 1);
  next();
}

module.exports = { rateLimiter, blockedIPs };
