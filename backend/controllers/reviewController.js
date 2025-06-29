const Review = require('../models/review');

const getReviewsByAirline = async (req, res) => {
    try {
        const { airline } = req.params;
        const reviews = await Review.find({ airline }).populate('userId', 'name');
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching reviews', error });
    }
};

const addReview = async (req, res) => {
    try {
        const { airline, rating, comment } = req.body;
        const userId = req.user.id;

        const newReview = new Review({
            userId,
            airline,
            rating,
            comment
        });

        await newReview.save();
        res.status(201).json(newReview);
    } catch (error) {
        res.status(500).json({ message: 'Error adding review', error });
    }
};

module.exports = { getReviewsByAirline, addReview };
