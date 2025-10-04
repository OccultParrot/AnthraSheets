const rateLimit = new Map();

export default function rateLimitMiddleware(req, res, next) {
    const ip = req.ip;
    const now = Date.now();
    const rateLimitWindowMs = 60 * 1000; // 60 seconds
    const maxRequests = 10;

    // If the IP is not in the map, add it and specify the reset time
    if (!rateLimit.has(ip)) {
        rateLimit.set(ip, {count: 1, resetTime: now + rateLimitWindowMs})
        return next();
    }

    const record = rateLimit.get(ip);
    // If the window has passed, reset the count and window
    if (now > record.resetTime) {
        record.count = 1;
        record.resetTime = now + rateLimitWindowMs;
        return next();
    }

    // If they have queries over the max requests allowed, block the request! Save our resources!!!
    if (record.count >= maxRequests) {
        console.warn(`IP: ${ip} has been rate limited!`)
        return res.status(429).json({error: 'Too many requests'});
    }
  
    // If nothing happened, just increment the count and continue on to fulfilling the request
    record.count++;
    next();
}
