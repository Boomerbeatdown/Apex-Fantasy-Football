// src/TeamCreationForm.js
import { useState, useEffect } from 'react';
import axios from './axiosConfig';  // Use the customized Axios instance

function TeamCreationForm({ leagueId, onTeamCreated }) {
    const [teamName, setTeamName] = useState('');
    const [message, setMessage] = useState(null);

    const handleCreateTeam = async () => {
        try {
            const response = await axios.post('/api/teams/', { name: teamName, league: leagueId });
            setMessage("Team created successfully!");
            setTeamName('');  // Clear input on success
            onTeamCreated(response.data.id);  // Pass the created team ID back
        } catch (error) {
            setMessage("Error creating team. Please try again.");
            console.error("Error creating team:", error);
        }
    };

    // Automatically clear the message after 3 seconds
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => setMessage(null), 3000);  // Clear message after 3 seconds
            return () => clearTimeout(timer);  // Clean up the timer on component unmount
        }
    }, [message]);

    return (
        <div>
            <input
                placeholder="Team Name"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
            />
            <button onClick={handleCreateTeam}>Create Team</button>
            {message && <p>{message}</p>}
        </div>
    );
}

export default TeamCreationForm;
