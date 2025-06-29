const mongoose = require('mongoose');

const layoverSchema = new mongoose.Schema({
    airport: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    arrivalTime: {
        type: Date,
        required: true
    },
    departureTime: {
        type: Date,
        required: true
    },
    incomingflightnumber:{
        type: String,
        required: true
    },
    outgoingflightnumber:{
        type: String,
        required: true
    }
});

const flightdetailsSchema = new mongoose.Schema({
    /*uniqueid:{
        type:String,
        required:true
    },*/
    flightnumber:{
        type:Number,
        required:true,
        unique:true
    },
    airline:{
        type:String,
        required:true
    },
    originairport:{
        type:String,
        required:true
    },
    origincity:{
        type:String,
        required:true
    },
    destinationairport:{
        type:String,
        required:true
    },
    destinationcity:{
        type:String,
        required:true
    },
    scheduledeparturetime:{
        type:Date,
        required:true
    },

    scheduledarrivaltime:{
        type:Date,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    class:{
        type:String,
        required:true
    },
    seats:{
type:Number,
required:true
    },
    status:{
        type:String,
        
       },
       reason:{
           type:String,
          
       },
       newDeparturetime:{
           type:Date,
          
       }, 
       newArrivaltime:{
        type:Date,
        
    },
       gate:{
           type:String,
           
       },
       terminal:{
           type:String,
          
       },
       layovers: [layoverSchema]


})


const FlightDetails = mongoose.model('FlightDetails',flightdetailsSchema);

module.exports = FlightDetails;