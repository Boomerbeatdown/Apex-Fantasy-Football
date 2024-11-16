import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post('/auth/login/', {
                email,
                password,
            });
            localStorage.setItem('token', response.data.access); // Store the JWT token
            setMessage('Login successful!');
        } catch (error) {
            setMessage('Error: ' + error.response.data);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <input 
                type="email" 
                placeholder="Email" 
                onChange={(e) => setEmail(e.target.value)} 
            />
            <input 
                type="password" 
                placeholder="Password" 
                onChange={(e) => setPassword(e.target.value)} 
            />
            <button onClick={handleLogin}>Login</button>
            <p>{message}</p>
        </div>
    );
};

export default Login;
const validate = () => {
    const errors = {};
    if (!email.includes('@')) {
        errors.email = 'Please enter a valid email address.';
    }
    if (!password) {
        errors.password = 'Password cannot be empty.';
    }
    return errors;
};
