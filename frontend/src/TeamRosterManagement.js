// src/TeamRosterManagement.js
import { useEffect, useState } from 'react';
import axios from './axiosConfig';

function TeamRosterManagement({ teamId }) {
    const [players, setPlayers] = useState([]);
    const [newPlayerName, setNewPlayerName] = useState('');
    const [message, setMessage] = useState(null);

    useEffect(() => {
        const fetchRoster = async () => {
            try {
                const response = await axios.get(`/api/teams/${teamId}/players/`);
                setPlayers(response.data);
                setMessage(null);
            } catch (error) {
                console.error("Error fetching roster:", error);
                setMessage("Error loading roster.");
            }
        };

        fetchRoster();
    }, [teamId]);

    const handleAddPlayer = async () => {
        if (!newPlayerName.trim()) {
            setMessage("Player name cannot be empty.");
            return;
        }
        try {
            const response = await axios.post(`/api/teams/${teamId}/players/`, { name: newPlayerName });
            setPlayers([...players, response.data]);
            setNewPlayerName('');
            setMessage("Player added!");
        } catch (error) {
            console.error("Error adding player:", error);
            setMessage("Error adding player.");
        }
    };

    const handleRemovePlayer = async (playerId) => {
        try {
            await axios.delete(`/api/teams/${teamId}/players/${playerId}/`);
            setPlayers(players.filter(player => player.id !== playerId));
            setMessage("Player removed!");
        } catch (error) {
            console.error("Error removing player:", error);
            setMessage("Error removing player.");
        }
    };

    return (
        <div>
            <h2>Team Roster</h2>
            {message && <p>{message}</p>}
            <ul>
                {players.map((player) => (
                    <li key={player.id}>
                        {player.name}{" "}
                        <button onClick={() => handleRemovePlayer(player.id)}>Remove</button>
                    </li>
                ))}
            </ul>
            <input
                type="text"
                placeholder="New Player Name"
                value={newPlayerName}
                onChange={(e) => setNewPlayerName(e.target.value)}
            />
            <button onClick={handleAddPlayer}>Add Player</button>
        </div>
    );
}

export default TeamRosterManagement;
