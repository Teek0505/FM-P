require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const secretKey = process.env.secretKey;
const bcrypt = require('bcrypt');
const saltRounds = 10;
const generateToken = (userId, role) => {
    return jwt.sign({ userId, role }, secretKey, { expiresIn: '1h' });
};

let hashedPassword;
const signup = async (req, res) => {
    try {
        const { email, password } = req.body;
        const hashedPassword = password;
        
        const user = new User({ email, password: hashedPassword, role: 'user' });
        await user.save();

        const token = generateToken(user._id, user.role);
        res.status(201).send({ user, token }); // Return user and token
    } catch (error) {
        console.error('Error signing up:', error.toString());
        res.status(500).send('Error signing up');
    }
};

/*const verifyEmail = async (req, res) => {
    // This function remains unchanged from your previous implementation
    const token = req.params.token;
    try {
        const decoded = jwt.verify(token, secretKey);
        const user = await User.findById(decoded.userId);
        if (!user) return res.status(404).send('User not found');
        user.verified = true;
        await user.save();
        res.send('Email verified successfully');
    } catch (error) {
        console.error('Error verifying email:', error.toString());
        res.status(500).send('Error verifying email');
    }
};
*/
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log({ password });
        const user = await User.findOne({ email });
        if (!user) return res.status(404).send('User not found');
        const isMatch = await bcrypt.compare(password, user.password);
        console.log(user.password);
        console.log(password);
        if (!isMatch) return res.status(401).send('Invalid credentials');

        const token = generateToken(user._id, user.role); // Assuming role is stored in the user model
        res.send({ user, token });
    } catch (error) {
        console.error('Error logging in:', error.toString());
        res.status(500).send('Error logging in');
    }
};

module.exports = { signup, login };
