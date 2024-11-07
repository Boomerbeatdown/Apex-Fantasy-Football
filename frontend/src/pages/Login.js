// src/pages/Login.js
import React, { useState } from 'react';
import './styles.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Email: ${email}, Password: ${password}`);
  };

  return (
    <div className="rivalry-container">
      <h2>Competitive Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="rivalry-button">Login</button>
      </form>
    </div>
  );
};

export default Login;


