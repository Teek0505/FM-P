// flight.js
const express = require('express');
const router = express.Router();
const { getAllFlights, getFlight, addFlight, updateFlight, deleteFlight,getFlightStatusByPNR } = require('../controllers/flight');
const {verifyAdmin,verifyToken,verifyUser} = require('../controllers/auth');
const { searchFlights } = require('../controllers/flightSearch');

// Define routes with middleware for admin verification
router.get('/',  getAllFlights);
router.get('/:id',  getFlight);
router.post('/',  addFlight);
router.patch('/:id',  updateFlight);
router.delete('/:id',  deleteFlight);
router.get('/search', searchFlights);
router.get('/status/:pnr', getFlightStatusByPNR);

module.exports = router;
