// src/TeamRosterManagement.js
import { useEffect, useState } from 'react';
import axios from './axiosConfig';

function TeamRosterManagement({ teamId }) {
    const [players, setPlayers] = useState([]);
    const [newPlayerName, setNewPlayerName] = useState('');
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchRoster = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`/api/teams/${teamId}/players/`);
                setPlayers(response.data);
                setMessage(null);
            } catch (error) {
                console.error("Error fetching roster:", error);
                setMessage("Failed to load roster. Please try again.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchRoster();
    }, [teamId]);

    const handleAddPlayer = async () => {
        if (!newPlayerName.trim()) {
            setMessage("Player name cannot be empty.");
            return;
        }

        const optimisticPlayer = { id: Date.now(), name: newPlayerName };
        setPlayers([...players, optimisticPlayer]);
        setNewPlayerName('');
        setMessage("Adding player...");

        try {
            const response = await axios.post(`/api/teams/${teamId}/players/`, { name: newPlayerName });
            setPlayers(players => players.map(player => 
                player.id === optimisticPlayer.id ? response.data : player
            ));
            setMessage("Player added successfully!");
        } catch (error) {
            console.error("Error adding player:", error);
            setPlayers(players => players.filter(player => player.id !== optimisticPlayer.id));
            setMessage("Failed to add player. Please try again.");
        }
    };

    const handleRemovePlayer = async (playerId) => {
        const removedPlayer = players.find(player => player.id === playerId);
        setPlayers(players.filter(player => player.id !== playerId));
        setMessage("Removing player...");

        try {
            await axios.delete(`/api/teams/${teamId}/players/${playerId}/`);
            setMessage("Player removed successfully!");
        } catch (error) {
            console.error("Error removing player:", error);
            setPlayers([...players, removedPlayer]);
            setMessage("Failed to remove player. Please try again.");
        }
    };

    return (
        <div>
            <h2>Team Roster</h2>
            {message && <p>{message}</p>}
            {isLoading ? <p>Loading...</p> : (
                <ul>
                    {players.map((player) => (
                        <li key={player.id}>
                            {player.name}{" "}
                            <button onClick={() => handleRemovePlayer(player.id)}>Remove</button>
                        </li>
                    ))}
                </ul>
            )}
            <input
                type="text"
                placeholder="New Player Name"
                value={newPlayerName}
                onChange={(e) => setNewPlayerName(e.target.value)}
            />
            <button onClick={handleAddPlayer} disabled={isLoading}>Add Player</button>
        </div>
    );
}

export default TeamRosterManagement;
// src/TeamRosterManagement.js
import { useEffect, useState } from 'react';
import axios from './services/teamService';

function TeamRosterManagement({ teamId }) {
    const [players, setPlayers] = useState([]);
    const [newPlayerName, setNewPlayerName] = useState('');
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchRoster = async () => {
            setIsLoading(true);
            try {
                const response = await axios.getRoster(teamId);
                setPlayers(response.data);
                setMessage(null);
            } catch (error) {
                console.error("Error fetching roster:", error);
                setMessage("Failed to load roster. Please try again.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchRoster();
    }, [teamId]);

    const validatePlayerName = (name) => {
        if (!name.trim()) return "Player name cannot be empty.";
        if (name.length < 2 || name.length > 50) return "Player name must be between 2 and 50 characters.";
        if (!/^[a-zA-Z\s]+$/.test(name)) return "Player name can only contain letters and spaces.";
        if (players.some(player => player.name.toLowerCase() === name.toLowerCase())) return "Player name must be unique.";
        return null;
    };

    const handleAddPlayer = async () => {
        const errorMessage = validatePlayerName(newPlayerName);
        if (errorMessage) {
            setMessage(errorMessage);
            return;
        }

        const optimisticPlayer = { id: Date.now(), name: newPlayerName };
        setPlayers([...players, optimisticPlayer]);
        setNewPlayerName('');
        setMessage("Adding player...");

        try {
            const response = await axios.addPlayer(teamId, { name: newPlayerName });
            setPlayers(players => players.map(player => 
                player.id === optimisticPlayer.id ? response.data : player
            ));
            setMessage("Player added successfully!");
        } catch (error) {
            console.error("Error adding player:", error);
            setPlayers(players => players.filter(player => player.id !== optimisticPlayer.id));
            setMessage("Failed to add player. Please try again.");
        }
    };

    return (
        <div>
            <h2>Team Roster</h2>
            {message && <p>{message}</p>}
            {isLoading ? <p>Loading...</p> : (
                <ul>
                    {players.map((player) => (
                        <li key={player.id}>
                            {player.name}
                            <button onClick={() => handleRemovePlayer(player.id)}>Remove</button>
                        </li>
                    ))}
                </ul>
            )}
            <input
                type="text"
                placeholder="New Player Name"
                value={newPlayerName}
                onChange={(e) => setNewPlayerName(e.target.value)}
            />
            <button onClick={handleAddPlayer} disabled={isLoading}>Add Player</button>
        </div>
    );
}

export default TeamRosterManagement;
// src/TeamRosterManagement.js
import { useEffect, useState } from 'react';
import teamService from './services/teamService';

function TeamRosterManagement({ teamId }) {
    const [players, setPlayers] = useState([]);
    const [newPlayerName, setNewPlayerName] = useState('');
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchRoster = async () => {
            setIsLoading(true);
            try {
                const response = await teamService.getRoster(teamId);
                setPlayers(response.data);
                setMessage(null);
            } catch (error) {
                console.error("Error fetching roster:", error);
                setMessage("Failed to load roster. Please try again.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchRoster();
    }, [teamId]);

    const handleAddPlayer = async () => {
        const errorMessage = validatePlayerName(newPlayerName);
        if (errorMessage) {
            setMessage(errorMessage);
            return;
        }

        const optimisticPlayer = { id: Date.now(), name: newPlayerName };
        setPlayers([...players, optimisticPlayer]);
        setNewPlayerName('');
        setMessage("Adding player...");

        try {
            const response = await teamService.addPlayer(teamId, { name: newPlayerName });
            setPlayers(players => players.map(player => 
                player.id === optimisticPlayer.id ? response.data : player
            ));
            setMessage("Player added successfully!");
        } catch (error) {
            console.error("Error adding player:", error);
            setPlayers(players => players.filter(player => player.id !== optimisticPlayer.id));
            setMessage("Failed to add player. Please try again.");
        }
    };

    return (
        <div>
            <h2>Team Roster</h2>
            {message && <p>{message}</p>}
            {isLoading ? <p>Loading...</p> : (
                <ul>
                    {players.map((player) => (
                        <li key={player.id}>
                            {player.name}
                            <button onClick={() => handleRemovePlayer(player.id)}>Remove</button>
                        </li>
                    ))}
                </ul>
            )}
            <input
                type="text"
                placeholder="New Player Name"
                value={newPlayerName}
                onChange={(e) => setNewPlayerName(e.target.value)}
            />
            <button onClick={handleAddPlayer} disabled={isLoading}>Add Player</button>
        </div>
    );
}

export default TeamRosterManagement;
// src/TeamRosterManagement.js
import { useEffect, useState } from 'react';
import teamService from './services/teamService';

const MAX_PLAYERS = 20;

function TeamRosterManagement({ teamId }) {
    const [players, setPlayers] = useState([]);
    const [newPlayerName, setNewPlayerName] = useState('');
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchRoster = async () => {
            setIsLoading(true);
            try {
                const response = await teamService.getRoster(teamId);
                setPlayers(response.data);
                setMessage(null);
            } catch (error) {
                console.error("Error fetching roster:", error);
                setMessage("Failed to load roster. Please try again.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchRoster();
    }, [teamId]);

    const validatePlayerName = (name) => {
        if (!name.trim()) return "Player name cannot be empty.";
        if (name.length < 2 || name.length > 50) return "Player name must be between 2 and 50 characters.";
        if (!/^[a-zA-Z\s]+$/.test(name)) return "Player name can only contain letters and spaces.";
        if (players.some(player => player.name.toLowerCase() === name.toLowerCase())) return "Player name must be unique.";
        if (players.length >= MAX_PLAYERS) return `The roster is full. Maximum ${MAX_PLAYERS} players allowed.`;
        return null;
    };

    const handleAddPlayer = async () => {
        const errorMessage = validatePlayerName(newPlayerName);
        if (errorMessage) {
            setMessage(errorMessage);
            return;
        }

        const optimisticPlayer = { id: Date.now(), name: newPlayerName };
        setPlayers([...players, optimisticPlayer]);
        setNewPlayerName('');
        setMessage("Adding player...");

        try {
            const response = await teamService.addPlayer(teamId, { name: newPlayerName });
            setPlayers(players => players.map(player => 
                player.id === optimisticPlayer.id ? response.data : player
            ));
            setMessage("Player added successfully!");
        } catch (error) {
            console.error("Error adding player:", error);
            setPlayers(players => players.filter(player => player.id !== optimisticPlayer.id));
            setMessage("Failed to add player. Please try again.");
        }
    };

    return (
        <div>
            <h2>Team Roster</h2>
            {message && <p>{message}</p>}
            {isLoading ? <p>Loading...</p> : (
                <ul>
                    {players.map((player) => (
                        <li key={player.id}>
                            {player.name}{" "}
                            <button onClick={() => handleRemovePlayer(player.id)}>Remove</button>
                        </li>
                    ))}
                </ul>
            )}
            <input
                type="text"
                placeholder="New Player Name"
                value={newPlayerName}
                onChange={(e) => setNewPlayerName(e.target.value)}
                disabled={players.length >= MAX_PLAYERS}
            />
            <button onClick={handleAddPlayer} disabled={isLoading || players.length >= MAX_PLAYERS}>Add Player</button>
        </div>
    );
}

export default TeamRosterManagement;
// src/TeamRosterManagement.js
import { useEffect, useState } from 'react';
import teamService from './services/teamService';
import './TeamRosterManagement.css';

const MAX_PLAYERS = 20;

function TeamRosterManagement({ teamId }) {
    const [players, setPlayers] = useState([]);
    const [newPlayerName, setNewPlayerName] = useState('');
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchRoster = async () => {
            setIsLoading(true);
            try {
                const response = await teamService.getRoster(teamId);
                setPlayers(response.data);
                setMessage(null);
            } catch (error) {
                console.error("Error fetching roster:", error);
                setMessage("Failed to load roster. Please try again.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchRoster();
    }, [teamId]);

    const validatePlayerName = (name) => {
        if (!name.trim()) return "Player name cannot be empty.";
        if (name.length < 2 || name.length > 50) return "Player name must be between 2 and 50 characters.";
        if (!/^[a-zA-Z\s]+$/.test(name)) return "Player name can only contain letters and spaces.";
        if (players.some(player => player.name.toLowerCase() === name.toLowerCase())) return "Player name must be unique.";
        if (players.length >= MAX_PLAYERS) return `The roster is full. Maximum ${MAX_PLAYERS} players allowed.`;
        return null;
    };

    const handleAddPlayer = async () => {
        const errorMessage = validatePlayerName(newPlayerName);
        if (errorMessage) {
            setMessage(errorMessage);
            return;
        }

        const optimisticPlayer = { id: Date.now(), name: newPlayerName };
        setPlayers([...players, optimisticPlayer]);
        setNewPlayerName('');
        setMessage("Adding player...");

        try {
            const response = await teamService.addPlayer(teamId, { name: newPlayerName });
            setPlayers(players => players.map(player => 
                player.id === optimisticPlayer.id ? response.data : player
            ));
            setMessage("Player added successfully!");
        } catch (error) {
            console.error("Error adding player:", error);
            setPlayers(players => players.filter(player => player.id !== optimisticPlayer.id));
            setMessage("Failed to add player. Please try again.");
        }
    };

    return (
        <div>
            <h2>Team Roster</h2>
            {message && <p>{message}</p>}
            {isLoading ? <p>Loading...</p> : (
                <ul>
                    {players.map((player) => (
                        <li key={player.id}>
                            {player.name}{" "}
                            <button onClick={() => handleRemovePlayer(player.id)}>Remove</button>
                        </li>
                    ))}
                </ul>
            )}
            <input
                type="text"
                placeholder="New Player Name"
                value={newPlayerName}
                onChange={(e) => setNewPlayerName(e.target.value)}
                className={players.length >= MAX_PLAYERS ? 'input-disabled' : ''}
                disabled={players.length >= MAX_PLAYERS}
            />
            <button
                onClick={handleAddPlayer}
                disabled={isLoading || players.length >= MAX_PLAYERS}
                className={players.length >= MAX_PLAYERS ? 'button-disabled' : ''}
            >
                Add Player
            </button>
            {players.length >= MAX_PLAYERS && (
                <p className="full-roster-message">
                    The roster is full. Maximum {MAX_PLAYERS} players allowed.
                </p>
            )}
        </div>
    );
}

export default TeamRosterManagement;
// src/TeamRosterManagement.js
import { useEffect, useState } from 'react';
import teamService from './services/teamService';
import ConfirmModal from './components/ConfirmModal';
import './TeamRosterManagement.css';

const MAX_PLAYERS = 20;

function TeamRosterManagement({ teamId }) {
    const [players, setPlayers] = useState([]);
    const [newPlayerName, setNewPlayerName] = useState('');
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [playerToRemove, setPlayerToRemove] = useState(null);

    const fetchRoster = async () => {
        setIsLoading(true);
        try {
            const response = await teamService.getRoster(teamId);
            setPlayers(response.data);
            setMessage(null);
        } catch (error) {
            console.error("Error fetching roster:", error);
            setMessage(error.code === 'ECONNABORTED' ? "Request timed out. Please try again." : "Failed to load roster. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchRoster();
    }, [teamId]);

    const handleAddPlayer = async () => {
        const errorMessage = validatePlayerName(newPlayerName);
        if (errorMessage) {
            setMessage(errorMessage);
            return;
        }

        const optimisticPlayer = { id: Date.now(), name: newPlayerName };
        setPlayers([...players, optimisticPlayer]);
        setNewPlayerName('');
        setMessage("Adding player...");

        try {
            const response = await teamService.addPlayer(teamId, { name: newPlayerName });
            setPlayers(players => players.map(player => 
                player.id === optimisticPlayer.id ? response.data : player
            ));
            setMessage("Player added successfully!");
        } catch (error) {
            console.error("Error adding player:", error);
            setPlayers(players => players.filter(player => player.id !== optimisticPlayer.id));
            setMessage(error.code === 'ECONNABORTED' ? "Add request timed out. Please try again." : "Failed to add player. Please try again.");
        }
    };

    const confirmRemovePlayer = async () => {
        try {
            await teamService.removePlayer(teamId, playerToRemove);
            setPlayers(players.filter(player => player.id !== playerToRemove));
            setMessage("Player removed successfully!");
        } catch (error) {
            console.error("Error removing player:", error);
            setMessage(error.code === 'ECONNABORTED' ? "Remove request timed out. Please try again." : "Failed to remove player. Please try again.");
        } finally {
            setShowConfirmModal(false);
            setPlayerToRemove(null);
        }
    };

    return (
        // Component JSX remains the same
    );
}
