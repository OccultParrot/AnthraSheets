function requestLogging(req, res, next) {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.originalUrl} from ${req.ip}`);
    next();
}

export default requestLogging