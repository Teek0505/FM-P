require('dotenv').config();
const jwt = require('jsonwebtoken');
const secretKey = process.env.secretKey;
console.log(secretKey);

const adminLogin = async (req, res) => {
    const { username, password } = req.body;
    // Replace this with your admin credentials verification logic
    if (username === 'admin' && password === 'password') {
        const token = jwt.sign({ username, role: 'admin' }, secretKey, { expiresIn: '1h' });
        res.json({ token }); // Send the token as JSON response
       
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
};

module.exports = adminLogin;
