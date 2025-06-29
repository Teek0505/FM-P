const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt')
const userSchema = new mongoose.Schema({
    role:{
        type:String,
        require:true
    },
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        lowercase: true,
        validate: {
            validator: (value) => validator.isEmail(value),
            message: 'Invalid email format'
        }
    },
    password: { type: String, required: true },
    fullName: { type: String },
    phoneNumber: { type: String },
    address: { type: String },
    travelPreferences: {
        seatType: { type: String },
        mealPreferences: { type: String },
        frequentFlyerNumber: { type: String }
    }
   /* bookingHistory: [{
        flightNumber: { type: String },
        date: { type: Date },
        from: { type: String },
        to: { type: String },
        status: { type: String }
    }],*/
    /*reviews: [{
        flightNumber: { type: String },
        rating: { type: Number },
        comment: { type: String }
    }]*/
});




userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.methods.comparePassword = async function(password) {
    return bcrypt.compare(password, this.password);
};

const User = mongoose.model('User',userSchema);

module.exports = User;