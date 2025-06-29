import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminUserList = ({ token }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, [token]);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/user', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
           
        }
    };

    return (
        <div>
            <h2>All Users</h2>
            <ul>
                {users.map(user => (
                    <li key={user._id}>
                        {user.fullName} ({user.email})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminUserList;
