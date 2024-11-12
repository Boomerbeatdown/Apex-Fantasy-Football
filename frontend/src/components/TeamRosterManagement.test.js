// src/components/TeamRosterManagement.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TeamRosterManagement from './TeamRosterManagement';
import { Provider } from 'react-redux';
import store from '../store';

describe('TeamRosterManagement', () => {
    test('renders the component', () => {
        render(
            <Provider store={store}>
                <TeamRosterManagement teamId={1} />
            </Provider>
        );
        expect(screen.getByText(/Team Roster/i)).toBeInTheDocument();
    });

    test('adds a player', async () => {
        render(
            <Provider store={store}>
                <TeamRosterManagement teamId={1} />
            </Provider>
        );
        fireEvent.change(screen.getByPlaceholderText(/New Player Name/i), { target: { value: 'Player1' } });
        fireEvent.click(screen.getByText(/Add Player/i));
        expect(await screen.findByText('Player1')).toBeInTheDocument();
    });

    test('removes a player', async () => {
        render(
            <Provider store={store}>
                <TeamRosterManagement teamId={1} />
            </Provider>
        );
        fireEvent.change(screen.getByPlaceholderText(/New Player Name/i), { target: { value: 'Player1' } });
        fireEvent.click(screen.getByText(/Add Player/i));
        expect(await screen.findByText('Player1')).toBeInTheDocument();

        fireEvent.click(screen.getByText(/Remove/i));
        expect(screen.queryByText('Player1')).not.toBeInTheDocument();
    });
});
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

    const handleRemovePlayer = (playerId) => {
        setPlayerToRemove(playerId);
        setShowConfirmModal(true);
    };

    const confirmRemovePlayer = async () => {
        try {
            await teamService.removePlayer(teamId, playerToRemove);
            setPlayers(players.filter(player => player.id !== playerToRemove));
            setMessage("Player removed successfully!");
        } catch (error) {
            console.error("Error removing player:", error);
            setMessage("Failed to remove player. Please try again.");
        } finally {
            setShowConfirmModal(false);
            setPlayerToRemove(null);
        }
    };

    const cancelRemovePlayer = () => {
        setShowConfirmModal(false);
        setPlayerToRemove(null);
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
            <button
                onClick={handleAddPlayer}
                disabled={isLoading || players.length >= MAX_PLAYERS}
            >
                Add Player
            </button>
            {showConfirmModal && (
                <ConfirmModal
                    message="Are you sure you want to remove this player?"
                    onConfirm={confirmRemovePlayer}
                    onCancel={cancelRemovePlayer}
                />
            )}
        </div>
    );
}

export default TeamRosterManagement;

// src/TeamRosterManagement.js
import ConfirmModal from './components/ConfirmModal';

// In the JSX
{showConfirmModal && (
    <ConfirmModal
        message="Are you sure you want to remove this player?"
        onConfirm={confirmRemovePlayer}
        onCancel={cancelRemovePlayer}
        confirmLabel="Yes, Remove"
        cancelLabel="No, Keep"
    />
)}
