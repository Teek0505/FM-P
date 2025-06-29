const express = require('express');
const router = express.Router();
const {verifyToken,verifyUser,verifyAdmin} = require('../controllers/auth');

const {  getAllusers, getUser, updateuser, deleteuser } = require('../controllers/user');

router.get('/',verifyToken,verifyAdmin,getAllusers);
//getting all users

router.get('/profile/:id',verifyToken,verifyUser,getUser);
//getting user by id

router.put('/profile/:id',verifyToken,verifyUser,updateuser);
//updating user

router.delete('/profile/:id',verifyToken,verifyUser,deleteuser);


//deleting user 

module.exports = router;