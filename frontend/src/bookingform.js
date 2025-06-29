import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const BookingForm = ({ userId }) => {
    const { flightId } = useParams();
    const token = localStorage.getItem('token');

    const [flight, setFlight] = useState(null);
    const [user, setUser] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        preferences: ''
    });

    const navigate = useNavigate();

    useEffect(() => {
        const fetchFlight = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/flight/${flightId}`);
                setFlight(response.data);
            } catch (error) {
                console.error('Error fetching flight details:', error);
            }
        };

        const fetchUserProfile = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/user/profile/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUser(response.data);
                setFormData({
                    name: response.data.name,
                    email: response.data.email,
                    phone: response.data.phone,
                    preferences: response.data.preferences || ''
                });
            } catch (error) {
                if (error.response && error.response.status === 403) {
                    // Handle unauthorized or redirect to login
                    navigate('/user/login');
                } else {
                    console.error('Error fetching user profile:', error);
                }
            }
        };

        if (flightId && userId) {
            fetchFlight();
            fetchUserProfile();
        }
    }, [flightId, userId, token, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const confirmBooking = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/bookings', {
                flightId,
                userId,
                formData
            });
            alert('Booking confirmed!');
            navigate(`/bookings/${response.data.booking.pnr}`); // Redirect to booking details page
        } catch (error) {
            console.error('Error confirming booking:', error);
            alert('Error confirming booking');
        }
    };

    if (!flight || !user) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h2>Book Flight {flight.flightnumber}</h2>
            <div>
                <p><strong>Departure:</strong> {flight.scheduledeparturetime}</p>
                <p><strong>Arrival:</strong> {flight.scheduledarrivaltime}</p>
                <p><strong>Duration:</strong> {flight.duration}</p>
                <p><strong>Price:</strong> ${flight.price}</p>
            </div>
            <form>
                <label>Name:</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />

                <label>Email:</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />

                <label>Phone:</label>
                <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />

                <label>Preferences:</label>
                <textarea name="preferences" value={formData.preferences} onChange={handleChange} />

                <button type="button" onClick={confirmBooking}>Confirm Booking</button>
            </form>
        </div>
    );
};

export default BookingForm;


