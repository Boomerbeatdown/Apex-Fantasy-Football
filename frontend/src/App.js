// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import LeagueCreationForm from './LeagueCreationForm';
import LeagueList from './LeagueList';
import TeamManagementPage from './TeamManagementPage';
import ProtectedPage from './pages/ProtectedPage';  // Adjust with your actual component
import ProtectedRoute from './components/ProtectedRoute';
import LogoutButton from './components/LogoutButton';

function App() {
    const leagueId = 1;  // Replace with a valid league ID as necessary

    return (
        <Router>
            <div className="App">
                <h1>League Management App</h1>
                
                {/* Navigation Links */}
                <nav>
                    <Link to="/">Home</Link> |{" "}
                    <Link to="/login">Login</Link> |{" "}
                    <Link to="/create-league">Create League</Link> |{" "}
                    <Link to="/leagues">View Leagues</Link> |{" "}
                    <Link to={`/team-management/${leagueId}`}>Manage Teams</Link> |{" "}
                    <Link to="/protected">Protected Page</Link>
                </nav>
                
                {/* Logout Button */}
                <LogoutButton />

                {/* Route Definitions */}
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/create-league" element={<LeagueCreationForm />} />
                    <Route path="/leagues" element={<LeagueList />} />
                    <Route path="/team-management/:leagueId" element={<TeamManagementPage />} />
                    
                    {/* Protected Route Example */}
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
}

export default App;
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import Profile from './Profile';

const App = () => {
    return (
        <Router>
            <Switch>
                <Route path="/register" component={Register} />
                <Route path="/login" component={Login} />
                <Route path="/profile" component={Profile} />
            </Switch>
        </Router>
    );
};

export default App;
