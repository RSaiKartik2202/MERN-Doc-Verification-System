import jwt from 'jsonwebtoken';

const { verify } = jwt;
const JWT_SECRET = process.env.JWT_SECRET;

function auth(req, res, next) {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (ex) {
        res.status(401).json({ message: 'Invalid token.' });
    }
}

export default auth;