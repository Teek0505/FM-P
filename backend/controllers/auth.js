require('dotenv').config();
const jwt = require('jsonwebtoken');
const secretKey = process.env.secretKey;

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({ message: 'No token provided' });
    }
    const token = authHeader.split(' ')[1];
    jwt.verify(token, secretKey, (err, decoded) => {
        console.log(token)
        console.log(secretKey)
        if (err) {
            console.log(err)
            return res.status(500).json({ message: 'Failed to authenticate token' });
        }
        req.userId = decoded.userId;
        req.role = decoded.role;
        console.log(req.userId);
        console.log(req.role);
        next();
       
    });
};

const verifyAdmin = (req, res, next) => {
    if (req.role !== 'admin') {
        return res.status(403).json({ message: 'Require admin role' });
    }
    next();
};

const verifyUser = (req, res, next) => {
    if (req.role !== 'user') {
        return res.status(403).json({ message: 'Require user role' });
    }
    next();
};

module.exports = { verifyToken, verifyAdmin, verifyUser };
