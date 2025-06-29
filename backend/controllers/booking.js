const { Booking } = require('../models/booking');

const generatePNR = () => {
    return 'PNR' + Math.random().toString(36).substr(2, 9).toUpperCase();
};

const dobooking = async (req, res) => {
    const { flightId, userId, formData } = req.body;

    try {
        const newBooking = new Booking({
            flightId,
            userId,
            pnr: generatePNR(),
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            preferences: formData.preferences
        });

        await newBooking.save();
        res.status(201).json({ message: 'Booking confirmed', booking: newBooking });
    } catch (error) {
        console.error('Error confirming booking:', error);
        res.status(500).json({ message: 'Error confirming booking' });
    }
};


const getBookingByPNR = async (req, res) => {
    const { pnr } = req.params;

    try {
        const booking = await Booking.findOne({ pnr });

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        res.json(booking);
    } catch (error) {
        console.error('Error fetching booking:', error);
        res.status(500).json({ message: 'Error fetching booking' });
    }
};


const getUserBookings = async (req, res) => {
    const { userId } = req.params;

    try {
        const bookings = await Booking.find({ userId });
        res.json(bookings);
    } catch (error) {
        console.error('Error fetching user bookings:', error);
        res.status(500).json({ message: 'Error fetching user bookings' });
    }
};

module.exports = { dobooking ,getBookingByPNR,getUserBookings};
