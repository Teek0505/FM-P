const User = require('../models/user');

// Getting all flights
const getAllusers = async (req, res) => {
    try {
        console.log("getting all users");
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
        console.log(error);
    }
};

// Getting a single flight
const getUser = async (req, res) => {

    try {
        
        const user = await User.findById(req.userId);
        console.log(user);
        if (!user) {
            return res.status(404).json({ message: 'No such user exists' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error fetching user', error });
    }
};

// Updating a flight
const updateuser = async (req, res) => {

    
    try {
        
        const user = await User.findByIdAndUpdate(req.userId, req.body, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'No such user exists' });
        }
      
        
        
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error updating user', error });
    }
};

// Deleting a flight
const deleteuser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.userId);
        if (!user) {
            return res.status(404).json({ message: 'No such user exists' });
        }
        res.status(200).json({ message: 'user deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error });
    }
};



module.exports = {  getAllusers, getUser, updateuser, deleteuser };
