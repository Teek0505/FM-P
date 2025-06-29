const mongoose = require('mongoose');


const flightstausschema = new mongoose.Schema({
flightNumber:{
    type:String,
    required:true,
    unique:true,
},
status:{
 type:String,
 required:true
},
reason:{
    type:String,
    required:true
},
newDeparture:{
    type:Date,
    required:true
},
gate:{
    type:String,
    required:true
},
terminal:{
    type:String,
    required:true
}
})