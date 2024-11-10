// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LeagueList from './components/LeagueList';  // Adjust path as necessary
import ProtectedRoute from './components/ProtectedRoute';
import ProtectedPage from './pages/ProtectedPage';  // Example protected page

const App = () => {
    return (
        <Router>
            <div>
                <h1>Welcome to the League App</h1>

                {/* Navigation Links */}
                <nav>
                    <Link to="/">Home</Link> |{" "}
                    <Link to="/protected">Protected Page</Link>
                </nav>

                {/* Define Routes */}
                <Routes>
                    {/* Public Route */}
                    <Route path="/" element={<LeagueList />} />

                    {/* Protected Route */}
                    <Route
                        path="/protected"
                        element={
                            <ProtectedRoute>
                                <ProtectedPage />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
