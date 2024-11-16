import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleRegister = async () => {
        try {
            const response = await axios.post('/auth/registration/', {
                email,
                password,
            });
            setMessage('Registration successful! Check your email for verification.');
        } catch (error) {
            setMessage('Error: ' + error.response.data);
        }
    };

    return (
        <div>
            <h2>Register</h2>
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
            <button onClick={handleRegister}>Register</button>
            <p>{message}</p>
        </div>
    );
};

export default Register;
import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({});

    const validate = () => {
        const errors = {};
        if (!email.includes('@')) {
            errors.email = 'Please enter a valid email address.';
        }
        if (password.length < 6) {
            errors.password = 'Password must be at least 6 characters long.';
        }
        return errors;
    };

    const handleRegister = async () => {
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        try {
            const response = await axios.post('/auth/registration/', {
                email,
                password,
            });
            setMessage('Registration successful! Check your email for verification.');
        } catch (error) {
            setMessage('Error: ' + error.response.data);
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <input 
                type="email" 
                placeholder="Email" 
                onChange={(e) => setEmail(e.target.value)} 
            />
            {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
            <input 
                type="password" 
                placeholder="Password" 
                onChange={(e) => setPassword(e.target.value)} 
            />
            {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
            <button onClick={handleRegister}>Register</button>
            <p>{message}</p>
        </div>
    );
};

export default Register;
import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleRegister = async () => {
        setIsLoading(true);
        try {
            const response = await axios.post('/auth/registration/', {
                email,
                password,
            });
            setMessage('Registration successful! Check your email for verification.');
        } catch (error) {
            setMessage('Error: ' + error.response.data);
        }
        setIsLoading(false);
    };

    return (
        <div>
            <h2>Register</h2>
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
            <button onClick={handleRegister} disabled={isLoading}>
                {isLoading ? 'Registering...' : 'Register'}
            </button>
            <p>{message}</p>
        </div>
    );
};

export default Register;
const styles = {
    form: { maxWidth: '400px', margin: '0 auto', textAlign: 'center' },
    input: { width: '100%', padding: '10px', margin: '10px 0', borderRadius: '5px', border: '1px solid #ccc' },
    button: { padding: '10px 20px', borderRadius: '5px', background: '#007bff', color: 'white', border: 'none', cursor: 'pointer' },
    error: { color: 'red', fontSize: '14px' },
};

const Register = () => {
    // state and handler logic remains the same
    return (
        <div style={styles.form}>
            <h2>Register</h2>
            <input 
                style={styles.input} 
                type="email" 
                placeholder="Email" 
                onChange={(e) => setEmail(e.target.value)} 
            />
            {errors.email && <p style={styles.error}>{errors.email}</p>}
            <input 
                style={styles.input} 
                type="password" 
                placeholder="Password" 
                onChange={(e) => setPassword(e.target.value)} 
            />
            {errors.password && <p style={styles.error}>{errors.password}</p>}
            <button 
                style={styles.button} 
                onClick={handleRegister} 
                disabled={isLoading}>
                {isLoading ? 'Registering...' : 'Register'}
            </button>
            <p>{message}</p>
        </div>
    );
};
