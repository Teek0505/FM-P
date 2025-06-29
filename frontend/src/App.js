import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AdminLogin from './adminlogin';
import UserLogin from './userlogin';
import Admin from './admin';
import Flights from './flight';
import Signup from './signup';
import AdminUserList from './adminuser';
import FlightSearch from './flightSearch';
import BookingForm from './bookingform';
import UserProfile from './user';
import Bookings from './bookings';
import FlightStatus from './flightstatus';

const App = () => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [role, setRole] = useState(localStorage.getItem('role'));
    const [userId, setUserId] = useState(localStorage.getItem('userId'));

    const removingToken = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        setToken("");
        setRole("");
    };

    const removingId = () => {
        localStorage.removeItem('userId');
        setUserId("");
        removingToken();
    };

    return (
        <Router>
            <Routes>
                <Route path="/" element={token && role === 'admin' ? <FlightSearch /> : <AdminLogin setToken={setToken} setRole={setRole} />} />
                <Route path="/admin/login" element={token && role === 'admin' ? <Navigate to="/admin" /> : <AdminLogin setToken={setToken} setRole={setRole} />} />
                <Route path="/user/login" element={token && role === 'user' ? <Navigate to={`/user/${userId}`} /> : <UserLogin setToken={setToken} setRole={setRole} setUserId={setUserId} />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/admin" element={token && role === 'admin' ? <Admin token={token} role={role} removingToken={removingToken} /> : <Navigate to="/admin/login" />} />
                <Route path="/user/:userId" element={token && role === 'user' ? <UserProfile token={token} userId={userId} removingId={removingId} /> : <Navigate to="/user/login" />} />
                <Route path="/admin/flights" element={token && role === 'admin' ? <Flights token={token} role={role} /> : <Navigate to="/admin/login" />} />
                <Route path="/admin/user" element={token && role === 'admin' ? <AdminUserList token={token} role={role} /> : <Navigate to="/admin/login" />} />
                <Route path="/user" element={token && role === 'user' ? <UserProfile token={token} userId={userId} removingId={removingId} /> : <Navigate to="/user/login" />} />
                <Route path="/flight/:flightId/book" element={<BookingForm userId={userId} />} />
                <Route path="/search-flights" element={<FlightSearch />} />
                <Route path="/bookings/:pnr" element={<Bookings />} />
                <Route path="/flight/status" element={<FlightStatus token={token} />} />
            </Routes>
        </Router>
    );
};

export default App;
