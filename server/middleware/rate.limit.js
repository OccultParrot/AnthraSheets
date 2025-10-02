const rateLimit = new Map();

export default function rateLimitMiddleware(req, res, next) {
  const ip = req.ip;
  const now = Date.now();
  const windowMs = 60 * 1000;
  const maxRequests = 10;

  if (!rateLimit.has(ip)) {
    rateLimit.set(ip, { count: 1, resetTime: now + windowMs })
    return next();
  }

  const record = rateLimit.get(ip);
  if (now > record.resetTime) {
    record.count = 1;
    record.resetTime = now + windowMs;
    return next();
  }

  if (record.count >= maxRequests) {
    console.warn(`IP: ${ip} has been rate limited!`)
    return res.status(429).json({ error: 'Too many requests' });
  }

  record.count++;
  next();
}
