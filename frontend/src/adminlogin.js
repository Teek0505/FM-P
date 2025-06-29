import React, { useState } from 'react';
import axios from 'axios';

const AdminLogin = ({ setToken, setRole }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/admin/login', { username, password });
            setToken(response.data.token);
            setRole('admin');
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('role', 'admin');
            window.location.href = '/admin';
        } catch (error) {
            setError('Login failed');
            console.error('Login failed:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Username:</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div>
                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button type="submit">Login</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
    );
};

export default AdminLogin;
