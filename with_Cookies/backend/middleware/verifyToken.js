const jwt = require('jsonwebtoken');
const data_from_mongodb_verify_for_login = require('../models/user');

// Middleware to check token from cookies
const authMiddleware = async (req, res, next) => {
    const token = req.cookies.authToken; // get token from cookies

    if (!token) {
        return res.status(401).json({ message: 'Login first' });
    }

    try {
        // verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // get user from DB
        const user = await data_from_mongodb_verify_for_login.findById(decoded.id);

        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        req.user = user; // attach user to request
        next(); // move to next handler
    } catch (err) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};

module.exports = authMiddleware;
