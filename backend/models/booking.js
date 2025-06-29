const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const bookingSchema = new mongoose.Schema({
    flightId: String,
    userId: String,
    pnr: { type: String, unique: true },
    name: String,
    email: String,
    phone: String,
    preferences: String,
    createdAt: { type: Date, default: Date.now }
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = { Booking };
