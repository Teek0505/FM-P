const FlightDetails = require('../models/flightdetails'); // Verify this import

const { Booking } = require('../models/booking');
// Getting all flights
const getAllFlights = async (req, res) => {
    try {
        console.log("getting all flights");
        const flights = await FlightDetails.find();
        res.status(200).json(flights);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching flights', error });
        console.log(error);
    }
};

// Getting a single flight
const getFlight = async (req, res) => {
    try {console.log("getting flight");
        const flight = await FlightDetails.findById(req.params.id);
        console.log(flight);
        if (!flight) {
            return res.status(404).json({ message: 'No such flight exists' });
        }
        res.status(200).json(flight);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching flight', error });
    }
};

// Updating a flight
const updateFlight = async (req, res) => {
    try {
        const flight = await FlightDetails.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!flight) {
            return res.status(404).json({ message: 'No such flight exists' });
        }
        res.status(200).json(flight);
    } catch (error) {
        res.status(500).json({ message: 'Error updating flight', error });
    }
};

// Deleting a flight
const deleteFlight = async (req, res) => {
    try {
        const flight = await FlightDetails.findByIdAndDelete(req.params.id);
        if (!flight) {
            return res.status(404).json({ message: 'No such flight exists' });
        }
        res.status(200).json({ message: 'Flight deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting flight', error });
    }
};

// Adding a flight 
const addFlight = async (req, res) => {
    try {
        const newFlight = new FlightDetails(req.body);
        console.log(newFlight)
        await newFlight.save();
        res.status(201).json(newFlight);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error adding flight', error });
    }
};


const getFlightStatusByPNR = async (req, res) => {
    try {
        const { pnr } = req.params;
        const booking = await Booking.findOne({ pnr });

        if (!booking) {
            return res.status(404).json({ message: 'No booking found with this PNR' });
        }

        const flight = await FlightDetails.findById(booking.flightId);

        if (!flight) {
            return res.status(404).json({ message: 'No flight found for this booking' });
        }

        res.status(200).json({ booking, flight });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching flight status', error });
    }
};

module.exports = { addFlight, getAllFlights, getFlight, updateFlight, deleteFlight,getFlightStatusByPNR };
