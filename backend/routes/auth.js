const express = require('express');
const router = express.Router();
const {signup,login} = require('../controllers/authcontroller');

router.get('/',(req,res)=>{
    res.json({msg:"connected"});
})
router.post('/signup',signup);
//router.get('/verify/:token', verifyEmail);
router.post('/login', login);

module.exports = router;