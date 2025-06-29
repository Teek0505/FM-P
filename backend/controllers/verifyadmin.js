require('dotenv').config();
const jwt = require('jsonwebtoken');
const secretKey = process.env.secretKey;

const verifyAdmin = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        console.log("No token provided");
        return res.status(403).json({ message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            console.error("Failed to authenticate token:", err);
            return res.status(500).json({ message: 'Failed to authenticate token' });
        }
        req.adminUsername = decoded.username;

        console.log("Token verified successfully");
        next();
    });
};

module.exports = verifyAdmin;
