const express = require('express');
const router = express.Router();
const {dobooking,getBookingByPNR,getUserBookings } = require('../controllers/booking');


router.post('/',dobooking);
router.get('/:pnr', getBookingByPNR);
router.get('/user/:userId', getUserBookings);


module.exports = router;