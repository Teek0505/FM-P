import React, { useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Admin = ({ token, removingtoken }) => {
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/admin', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                console.log('Response from admin endpoint:', response.data); // Logging response for debugging
            } catch (error) {
                console.error('Error fetching admin data:', error);
            }
        };

        fetchData();
    }, [token]); // Trigger useEffect whenever token changes

    return (
        <div>
            <h1>Admin Panel</h1>

            <button onClick={removingtoken}>
                Logout
            </button>

            <Link to="/admin/flights">Go to Flights</Link>
        </div>
    );
};

export default Admin;
