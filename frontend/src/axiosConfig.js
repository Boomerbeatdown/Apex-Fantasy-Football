// src/axiosConfig.js
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,  // Enable this if using cookies for authentication
});

// Dynamically set Authorization token
export const setAuthToken = (token) => {
    if (token) {
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete axiosInstance.defaults.headers.common['Authorization'];
    }
};

// Refresh token and retry failed request if a 401 error occurs
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response && error.response.status === 401 && !error.config._retry) {
            error.config._retry = true;
            const refreshToken = localStorage.getItem('refreshToken');

            if (refreshToken) {
                try {
                    const response = await axios.post(
                        `${process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000'}/api/token/refresh/`,
                        { refresh: refreshToken }
                    );
                    const newAccessToken = response.data.access;
                    localStorage.setItem('accessToken', newAccessToken);
                    setAuthToken(newAccessToken);

                    // Retry the original request with the new token
                    error.config.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return axiosInstance(error.config);
                } catch (refreshError) {
                    console.error("Token refresh failed:", refreshError);
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('refreshToken');
                    window.location.href = '/login';  // Redirect to login if refresh fails
                }
            } else {
                window.location.href = '/login';
            }
        }

        // Handle other errors, like 500 status
        if (error.response && error.response.status === 500) {
            console.error("Server error:", error);
        }

        return Promise.reject(error);
    }
);

// Helper function to log in a user and set tokens
export async function loginUser(credentials) {
    try {
        const response = await axiosInstance.post('/api/login/', credentials);
        const { access, refresh } = response.data;

        // Store tokens in localStorage
        localStorage.setItem('accessToken', access);
        localStorage.setItem('refreshToken', refresh);

        // Set the Authorization header with the access token
        setAuthToken(access);

        // Redirect to dashboard or another page after login
        window.location.href = '/dashboard';
    } catch (error) {
        console.error("Login failed:", error);
    }
}

// Helper function to log out a user and clear tokens
export function logoutUser() {
    // Clear tokens from localStorage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    // Remove Authorization header
    setAuthToken(null);

    // Redirect to login page
    window.location.href = '/login';
}

export default axiosInstance;
// src/services/axiosConfig.js
import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL, // Base URL from environment variables
    timeout: 5000, // 5 seconds timeout
});

// Retry logic utility
const retryRequest = async (request, retries = 3, delay = 1000) => {
    for (let i = 0; i < retries; i++) {
        try {
            return await request();
        } catch (error) {
            if (i === retries - 1 || !error.response || error.response.status >= 500) {
                throw error; // Give up after maximum retries or if it's a server error
            }
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
};

export { instance as axios, retryRequest };
