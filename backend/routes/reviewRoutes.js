const express = require('express');
const { getReviewsByAirline, addReview } = require('../controllers/reviewController');
const { verifyToken,verifyUser } = require('../controllers/auth');
const router = express.Router();

router.get('/:airline', getReviewsByAirline);
router.post('/', verifyToken,verifyUser, addReview);

module.exports = router;
