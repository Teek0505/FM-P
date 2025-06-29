const express = require('express');
const cors = require('cors');
const {verifyAdmin,verifyToken,verifyUser} = require('./controllers/auth');
require('dotenv').config();
const port = process.env.PORT;
const adminRouter = require('./routes/admin');
const mongoose = require('mongoose');
const adminLogin = require('./controllers/admin');
const MongoUrl = process.env.MongoUrl;
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const flightRouter = require('./routes/flight');
const bookingRouter = require('./routes/booking');
const reviewRouter = require('./routes/reviewRoutes');
 const app = express();
 const {searchFlights} = require('./controllers/flightSearch')
 const getFlight = require('./controllers/getflight');



 app.use(express.json());
app.use(cors());
console.log(MongoUrl)
mongoose.connect(MongoUrl).then(() => {
    console.log("Connected to MongoDB");
}).catch(err => {
    console.error("Connection error", err);
});

app.post('/api/admin/login', adminLogin); 
app.get('/api/flights/search',searchFlights);
app.get('/api/flight/:id',getFlight);
app.use('/api/auth',authRouter);
app.use('/api/user',userRouter);
app.use('/api/flights',flightRouter);

app.use('/api/bookings',bookingRouter);
app.use('/api/reviews',reviewRouter);


app.use('/api/admin',verifyToken,verifyAdmin,adminRouter);
app.listen(port,()=>{
    console.log("listening on port 5000")
})