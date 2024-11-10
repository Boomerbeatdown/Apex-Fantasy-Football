// src/pages/Login.js
import React, { useState } from 'react';
import axios from '../axiosConfig'; // Axios instance with baseURL
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../features/auth/authSlice';  // Import your login action if using Redux
import './styles.css';

const Login = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value,
        });
    };

    const handleLogin = async () => {
        try {
            const response = await axios.post('/api/login', credentials);  // Adjust the endpoint as needed
            const { accessToken, refreshToken } = response.data;

            // Save tokens and dispatch login action
            if (accessToken) {
                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('refreshToken', refreshToken);
                dispatch(login({ token: accessToken }));  // Dispatch login to Redux if applicable

                // Redirect to the intended page or fallback to home
                const from = location.state?.from?.pathname || '/';
                navigate(from, { replace: true });
            }
        } catch (error) {
            setError("Login failed. Please check your credentials.");
            console.error("Error during login:", error);
        }
    };

    return (
        <div className="rivalry-container">
            <h2>Login</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={(e) => e.preventDefault()}>
                <input
                    type="text"
                    name="username"
                    value={credentials.username}
                    onChange={handleChange}
                    placeholder="Username"
                    required
                />
                <input
                    type="password"
                    name="password"
                    value={credentials.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required
                />
                <button onClick={handleLogin} className="rivalry-button">Login</button>
            </form>
        </div>
    );
};

export default Login;
