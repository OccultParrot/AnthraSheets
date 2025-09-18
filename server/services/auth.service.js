import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret-secret-ive-got-a-secret';
const JWT_EXPIRATION = '2h';

function createToken(payload) {
    console.debug('Signing JWT token.');
    return jwt.sign({...payload}, JWT_SECRET, {expiresIn: JWT_EXPIRATION});
}

/**
 * Authenticates a JWT.
 * NOTE: This is asynchronous and will throw when token is invalid
 *
 * @param authHeader Authorization header from a request
 * @returns {*} Returns the payload decoded
 * @throws Error When missing header or invalid token
 */
async function authenticateToken(authHeader) {
    if (!authHeader) {
        throw new Error('Authorization header is missing');
    }

    const token = authHeader.split(' ')[1];

    try {
        return await jwt.verify(token, JWT_SECRET);
    } catch (err) {
        console.error('Invalid JWT token :: {}', token)
        throw new Error('Invalid or expired token');
    }
}

export default {
    authenticateToken, createToken
}