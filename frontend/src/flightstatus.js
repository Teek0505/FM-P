import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const FlightStatus = ({ token }) => {
    const [pnr, setPNR] = useState('');
    const [flightStatus, setFlightStatus] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!token) {
            navigate('/user/login');
            return;
        }
        try {
            const response = await axios.get(`http://localhost:5000/api/flights/status/${pnr}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setFlightStatus(response.data);
            setError('');
        } catch (err) {
            console.error('Error fetching flight status:', err);
            setError('Error fetching flight status');
            setFlightStatus(null);
        }
    };

    return (
        <div>
            <h2>Flight Status</h2>
            <form onSubmit={handleSubmit}>
                <label>PNR Number:</label>
                <input
                    type="text"
                    value={pnr}
                    onChange={(e) => setPNR(e.target.value)}
                    required
                />
                <button type="submit">Check Status</button>
            </form>
            {error && <p>{error}</p>}
            {flightStatus && (
                <div>
                    <h3>Status for Flight {flightStatus.flight.flightnumber}</h3>
                    <p><strong>Airline:</strong> {flightStatus.flight.airline}</p>
                    <p><strong>Origin:</strong> {flightStatus.flight.origincity}</p>
                    <p><strong>Destination:</strong> {flightStatus.flight.destinationcity}</p>
                    <p><strong>Scheduled Departure:</strong> {new Date(flightStatus.flight.scheduledeparturetime).toLocaleString()}</p>
                    <p><strong>Scheduled Arrival:</strong> {new Date(flightStatus.flight.scheduledarrivaltime).toLocaleString()}</p>
                    <p><strong>Status:</strong> {flightStatus.flight.status}</p>
                    {flightStatus.flight.reason && <p><strong>Reason:</strong> {flightStatus.flight.reason}</p>}
                    {flightStatus.flight.newDeparturetime && <p><strong>New Departure:</strong> {new Date(flightStatus.flight.newDeparturetime).toLocaleString()}</p>}
                    {flightStatus.flight.newArrivaltime && <p><strong>New Arrival:</strong> {new Date(flightStatus.flight.newArrivaltime).toLocaleString()}</p>}
                    {flightStatus.flight.gate && <p><strong>Gate:</strong> {flightStatus.flight.gate}</p>}
                    {flightStatus.flight.terminal && <p><strong>Terminal:</strong> {flightStatus.flight.terminal}</p>}
                </div>
            )}
        </div>
    );
};

export default FlightStatus;
