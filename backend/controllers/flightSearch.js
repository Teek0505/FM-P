const FlightDetails = require('../models/flightdetails');

const searchFlights = async (req, res) => {
    try {
        const { origin, destination, departureDate, returnDate, tripType, direct } = req.query;

        let query = {
            origincity: origin,
            destinationcity: destination,
            scheduledeparturetime: {
                $gte: new Date(departureDate),
                $lt: new Date(new Date(departureDate).setDate(new Date(departureDate).getDate() + 1))
            }
        };

        if (tripType === 'round-trip' && returnDate) {
            query.scheduledarrivaltime = {
                $gte: new Date(returnDate),
                $lt: new Date(new Date(returnDate).setDate(new Date(returnDate).getDate() + 1))
            };
        }

        if (direct === 'true') {
            query.layovers = { $size: 0 };
        }

        const flights = await FlightDetails.find(query).sort({ price: 1 });

        res.json(flights);
    } catch (error) {
        console.error('Error searching flights:', error);
        res.status(500).send('Error searching flights');
    }
};


module.exports = { searchFlights };
