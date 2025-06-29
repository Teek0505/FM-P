import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Flights = ({ token,role }) => {
    const [flights, setFlights] = useState([]);
    const [newFlight, setNewFlight] = useState({
        flightnumber: '',
        airline: '',
        originairport: '',
        origincity: '',
        destinationairport: '',
        destinationcity: '',
        scheduledeparturetime: '',
        scheduledarrivaltime: '',
        price: '',
        class: '',
        seats: '',
        status: '',
        reason: '',
        newDeparturetime: '',
        newArrivaltime: '',
        gate: '',
        terminal: '',
        layovers: [] // Initialize layovers as an empty array
    });
    const [editFlight, setEditFlight] = useState(null);
    const [updatedFlight, setUpdatedFlight] = useState({});
    const [error, setError] = useState('');

    // Dropdown options for status
    const statusOptions = ['On Time', 'Delayed', 'Cancelled'];

    useEffect(() => {
        fetchFlights();
    }, [token,role]);

    const fetchFlights = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/admin/flight', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setFlights(response.data);
        } catch (error) {
            console.error('Error fetching flights:', error);
            setError('Error fetching flights');
        }
    };

    const handleAddFlight = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/admin/flight', newFlight, {
                headers: { 'Authorization': `Bearer ${token}`, 'Role': role }
            });
            setFlights([...flights, response.data]);
            setNewFlight({
                flightnumber: '',
                airline: '',
                originairport: '',
                origincity: '',
                destinationairport: '',
                destinationcity: '',
                scheduledeparturetime: '',
                scheduledarrivaltime: '',
                price: '',
                class: '',
                seats: '',
                status: '',
                reason: '',
                newDeparturetime: '',
                newArrivaltime: '',
                gate: '',
                terminal: '',
                layovers: [] // Reset layovers array
            });
        } catch (error) {
            console.error('Error adding flight:', error);
            setError('Error adding flight');
        }
    };

    const handleUpdateFlight = async (id) => {
        try {
            const response = await axios.patch(`http://localhost:5000/api/admin/flight/${id}`, updatedFlight, {
                headers: { 'Authorization': `Bearer ${token}`, 'Role': role  }
            });
            setFlights(flights.map(flight => (flight._id === id ? response.data : flight)));
            setEditFlight(null);
            setUpdatedFlight({});
        } catch (error) {
            console.error('Error updating flight:', error);
            setError('Error updating flight');
        }
    };

    const handleDeleteFlight = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/admin/flight/${id}`, {
                headers: { 'Authorization': `Bearer ${token}`, 'Role': role  }
            });
            setFlights(flights.filter(flight => flight._id !== id));
        } catch (error) {
            console.error('Error deleting flight:', error);
            setError('Error deleting flight');
        }
    };

    const handleInputChange = (e, setState, state) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
    };

    const handleLayoverChange = (e, index) => {
        const { name, value } = e.target;
        const updatedLayovers = [...newFlight.layovers];
        updatedLayovers[index][name] = value;
        setNewFlight({ ...newFlight, layovers: updatedLayovers });
    };

    const addLayover = () => {
        setNewFlight({
            ...newFlight,
            layovers: [...newFlight.layovers, { airport: '', city: '', arrivalTime: '', departureTime: '' }]
        });
    };

    const removeLayover = (index) => {
        const updatedLayovers = [...newFlight.layovers];
        updatedLayovers.splice(index, 1);
        setNewFlight({ ...newFlight, layovers: updatedLayovers });
    };

    return (
        <div>
            <h1>Flights</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div>
                <h2>Add New Flight</h2>
                <form onSubmit={handleAddFlight}>
                    {Object.keys(newFlight).map(key => (
                        <div key={key}>
                            <label>{key}:</label>
                            {key === 'status' ? (
                                <select
                                    name={key}
                                    value={newFlight[key]}
                                    onChange={(e) => handleInputChange(e, setNewFlight, newFlight)}
                                >
                                    <option value="">Select Status</option>
                                    {statusOptions.map(option => (
                                        <option key={option} value={option}>{option}</option>
                                    ))}
                                </select>
                            ) : key === 'layovers' ? (
                                <div>
                                    {newFlight.layovers.map((layover, index) => (
                                        <div key={index}>
                                            <h3>Layover {index + 1}</h3>
                                            <label>Airport:</label>
                                            <input
                                                type="text"
                                                name={`layovers[${index}].airport`}
                                                value={layover.airport}
                                                onChange={(e) => handleLayoverChange(e, index)}
                                            />
                                            <label>City:</label>
                                            <input
                                                type="text"
                                                name={`layovers[${index}].city`}
                                                value={layover.city}
                                                onChange={(e) => handleLayoverChange(e, index)}
                                            />
                                            <label>Arrival Time:</label>
                                            <input
                                                type="datetime-local"
                                                name={`layovers[${index}].arrivalTime`}
                                                value={layover.arrivalTime}
                                                onChange={(e) => handleLayoverChange(e, index)}
                                            />
                                            <label>Departure Time:</label>
                                            <input
                                                type="datetime-local"
                                                name={`layovers[${index}].departureTime`}
                                                value={layover.departureTime}
                                                onChange={(e) => handleLayoverChange(e, index)}
                                            />
                                            <button type="button" onClick={() => removeLayover(index)}>Remove Layover</button>
                                        </div>
                                    ))}
                                    <button type="button" onClick={addLayover}>Add Layover</button>
                                </div>
                            ) : (
                                <input
                                    type={key.includes('time') ? 'datetime-local' : 'text'}
                                    name={key}
                                    value={newFlight[key]}
                                    onChange={(e) => handleInputChange(e, setNewFlight, newFlight)}
                                />
                            )}
                        </div>
                    ))}
                    <button type="submit">Add Flight</button>
                </form>
            </div>
            <ul>
                {flights.map(flight => (
                    <li key={flight._id}>
                        {editFlight === flight._id ? (
                            <div>
                                {Object.keys(newFlight).map(key => (
                                    <div key={key}>
                                        <label>{key}:</label>
                                        {key === 'layovers' ? (
                                            <div>
                                                {flight.layovers.map((layover, index) => (
                                                    <div key={index}>
                                                        <h3>Layover {index + 1}</h3>
                                                        <p>Airport: {layover.airport}</p>
                                                        <p>City: {layover.city}</p>
                                                        <p>Arrival Time: {layover.arrivalTime}</p>
                                                        <p>Departure Time: {layover.departureTime}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <input
                                                type={key.includes('time') ? 'datetime-local' : 'text'}
                                                name={key}
                                                value={updatedFlight[key] || flight[key]}
                                                onChange={(e) => handleInputChange(e, setUpdatedFlight, updatedFlight)}
                                            />
                                        )}
                                    </div>
                                ))}
                                <button onClick={() => handleUpdateFlight(flight._id)}>Update</button>
                            </div>
                        ) : (
                            <div>
                                <p>Flight Number: {flight.flightnumber}</p>
                                <p>Airline: {flight.airline}</p>
                                <button onClick={() => setEditFlight(flight._id)}>Edit</button>
                                <button onClick={() => handleDeleteFlight(flight._id)}>Delete</button>
                                <div>
                                    {flight.layovers.map((layover, index) => (
                                        <div key={index}>
                                            <h3>Layover {index + 1}</h3>
                                            <p>Airport: {layover.airport}</p>
                                            <p>City: {layover.city}</p>
                                            <p>Arrival Time: {layover.arrivalTime}</p>
                                            <p>Departure Time: {layover.departureTime}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Flights;
