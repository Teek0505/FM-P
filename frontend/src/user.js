import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserProfile = ({ token, userId, removingId }) => {
    const [user, setUser] = useState({});
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/user/profile/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUser(response.data);
                setEmail(response.data.email);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        const fetchBookings = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/bookings/user/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setBookings(response.data);
            } catch (error) {
                console.error('Error fetching bookings:', error);
            }
        };

        fetchUser();
        fetchBookings();
    }, [userId, token]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/api/user/profile/${userId}`, { email }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMessage('Profile updated successfully');
        } catch (error) {
            setMessage('Profile update failed');
            console.error('Profile update failed:', error);
        }
    };

    const handleLogout = () => {
        removingId();
    };

    return (
        <div>
            <h2>User Profile</h2>
            <form onSubmit={handleUpdate}>
                <label>Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <button type="submit">Update</button>
            </form>
            <button onClick={handleLogout}>Logout</button>
            {message && <p>{message}</p>}
            <h3>Past Bookings</h3>
            {bookings.length > 0 ? (
                <ul>
                    {bookings.map(booking => (
                        <li key={booking._id}>
                            <p><strong>PNR:</strong> {booking.pnr}</p>
                            <p><strong>Flight ID:</strong> {booking.flightId}</p>
                            <p><strong>Name:</strong> {booking.name}</p>
                            <p><strong>Email:</strong> {booking.email}</p>
                            <p><strong>Phone:</strong> {booking.phone}</p>
                            <p><strong>Preferences:</strong> {booking.preferences}</p>
                            <p><strong>Created At:</strong> {new Date(booking.createdAt).toLocaleString()}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No past bookings found.</p>
            )}
        </div>
    );
};

export default UserProfile;
