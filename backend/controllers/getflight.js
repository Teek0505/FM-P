// Getting a single flight

const FlightDetails = require('../models/flightdetails');
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

module.exports = getFlight;