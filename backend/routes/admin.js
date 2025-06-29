const express = require('express');
const router = express.Router();
const FlightDetails = require('../models/flightdetails');
const adminLogin = require('../controllers/admin');
const flightRoutes = require('./flight');
// Import the flight routes


const jwt = require('jsonwebtoken');
const { verifyAdmin,verifyToken } = require('../controllers/auth');
const secretKey = process.env.secretKey;

router.get('/',(req,res)=>{
    res.send("getting connected");
    
})
// Route to handle admin login


// Mount the flight routes under the '/flight' path
router.use('/flight', flightRoutes);

module.exports = router;
