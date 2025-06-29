import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BookingDetails = () => {
    const { pnr } = useParams();
    const [booking, setBooking] = useState(null);

    useEffect(() => {
        const fetchBooking = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/bookings/${pnr}`);
                setBooking(response.data);
            } catch (error) {
                console.error('Error fetching booking:', error);
            }
        };

        fetchBooking();
    }, [pnr]);

    if (!booking) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h2>Booking Details</h2>
            <p><strong>PNR:</strong> {booking.pnr}</p>
            <p><strong>Name:</strong> {booking.name}</p>
            <p><strong>Email:</strong> {booking.email}</p>
            <p><strong>Phone:</strong> {booking.phone}</p>
            <p><strong>Flight ID:</strong> {booking.flightId}</p>
            <p><strong>Preferences:</strong> {booking.preferences}</p>
            <p><strong>Created At:</strong> {new Date(booking.createdAt).toLocaleString()}</p>
        </div>
    );
};

export default BookingDetails;
