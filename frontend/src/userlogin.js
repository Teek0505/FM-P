import React, { useState } from 'react';
import axios from 'axios';

const UserLogin = ({ setToken, setRole, setUserId }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            const { token, user } = response.data;

            localStorage.setItem('token', token);
            localStorage.setItem('role', user.role);
            localStorage.setItem('userId', user._id);

            setToken(token);
            setRole(user.role);
            setUserId(user._id);

            window.location.href = `/user/${user._id}`; // Redirect to the user's profile page
        } catch (error) {
            setError('Login failed');
            console.error('Login failed:', error);
        }
    };

    return (
        <div>
            <h2>User Login</h2>
            <form onSubmit={handleLogin}>
                <label>Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Login</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default UserLogin;
