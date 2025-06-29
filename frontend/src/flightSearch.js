// FlightSearch.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const popularCities = ['New York', 'Los Angeles', 'Chicago', 'San Francisco', 'London', 'Paris', 'Tokyo', 'Sydney'];

const FlightSearch = ({ token }) => {
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [departureDate, setDepartureDate] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [tripType, setTripType] = useState('one-way');
    const [direct, setDirect] = useState(false);
    const [sortBy, setSortBy] = useState('price');
    const [flights, setFlights] = useState([]);
    const [error, setError] = useState('');
    const [expandedFlight, setExpandedFlight] = useState(null);

    const navigate = useNavigate();

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const formattedDepartureDate = new Date(departureDate).toISOString().split('T')[0];
            const formattedReturnDate = tripType === 'round-trip' ? new Date(returnDate).toISOString().split('T')[0] : undefined;

            const response = await axios.get('http://localhost:5000/api/flights/search', {
                params: {
                    origin,
                    destination,
                    departureDate: formattedDepartureDate,
                    returnDate: formattedReturnDate,
                    tripType,
                    direct,
                    sortBy
                }
            });
            setFlights(response.data);
        } catch (error) {
            setError('Error searching for flights');
            console.error('Error searching for flights:', error);
        }
    };

    const handleSortChange = (e) => {
        setSortBy(e.target.value);
    };

    const renderPopularCities = () => {
        return popularCities.map(city => <option key={city} value={city}>{city}</option>);
    };

    useEffect(() => {
        handleSearch({ preventDefault: () => {} });
    }, []);

    const handleBookNow = (flight) => {
        navigate(`/flight/${flight._id}/book`);
    };

    const handleClickFlight = async (flight) => {
        if (expandedFlight && expandedFlight._id === flight._id) {
            setExpandedFlight(null);
        } else {
            setExpandedFlight(flight);
        }
    };

    return (
        <div>
            <h2>Search Flights</h2>
            <form onSubmit={handleSearch}>
                <label>Origin:</label>
                <input type="text" list="originCities" value={origin} onChange={(e) => setOrigin(e.target.value)} required />
                <datalist id="originCities">
                    {renderPopularCities()}
                </datalist>

                <label>Destination:</label>
                <input type="text" list="destinationCities" value={destination} onChange={(e) => setDestination(e.target.value)} required />
                <datalist id="destinationCities">
                    {renderPopularCities()}
                </datalist>

                <label>Departure Date:</label>
                <input type="date" value={departureDate} onChange={(e) => setDepartureDate(e.target.value)} required />

                {tripType === 'round-trip' && (
                    <>
                        <label>Return Date:</label>
                        <input type="date" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} required />
                    </>
                )}

                <label>Trip Type:</label>
                <select value={tripType} onChange={(e) => setTripType(e.target.value)}>
                    <option value="one-way">One Way</option>
                    <option value="round-trip">Round Trip</option>
                </select>

                <label>Direct Flights Only:</label>
                <input type="checkbox" checked={direct} onChange={(e) => setDirect(e.target.checked)} />

                <label>Sort By:</label>
                <select value={sortBy} onChange={handleSortChange}>
                    <option value="price">Price</option>
                    <option value="scheduledeparturetime">Departure Time</option>
                    <option value="scheduledarrivaltime">Arrival Time</option>
                    <option value="seats">Seats Available</option>
                </select>

                <button type="submit">Search</button>
            </form>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <h3>Flight Results</h3>
            {flights.length > 0 ? (
                <ul>
                    {flights.map(flight => (
                        <li key={flight._id} onClick={() => handleClickFlight(flight)} style={{ cursor: 'pointer' }}>
                            <p>Flight Number: {flight.flightnumber}</p>
                            <p>Airline: {flight.airline}</p>
                            <p>Origin: {flight.originairport} ({flight.origincity})</p>
                            <p>Destination: {flight.destinationairport} ({flight.destinationcity})</p>
                            <p>Departure: {new Date(flight.scheduledeparturetime).toLocaleString()}</p>
                            <p>Arrival: {new Date(flight.scheduledarrivaltime).toLocaleString()}</p>
                            {expandedFlight && expandedFlight._id === flight._id && (
                                <>
                                    <p>Price: ${flight.price}</p>
                                    <p>Class: {flight.class}</p>
                                    <p>Seats Available: {flight.seats}</p>
                                    <p>Status: {flight.status}</p>
                                    <button onClick={() => handleBookNow(flight)}>Book Now</button>
                                    
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No flights found</p>
            )}
        </div>
    );
};

export default FlightSearch;
