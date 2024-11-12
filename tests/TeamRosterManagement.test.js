// src/TeamRosterManagement.test.js
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from './axiosConfig';
import TeamRosterManagement from './TeamRosterManagement';

// Mock axios methods
jest.mock('./axiosConfig');

describe('TeamRosterManagement Component', () => {
    const mockTeamId = '123';

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('fetches and displays players on initial render', async () => {
        axios.get.mockResolvedValueOnce({
            data: [{ id: 1, name: 'John Doe' }, { id: 2, name: 'Jane Smith' }],
        });

        render(<TeamRosterManagement teamId={mockTeamId} />);

        expect(axios.get).toHaveBeenCalledWith(`/api/teams/${mockTeamId}/players/`);
        expect(await screen.findByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    });

    test('displays error message if fetch fails', async () => {
        axios.get.mockRejectedValueOnce(new Error('Failed to fetch players'));

        render(<TeamRosterManagement teamId={mockTeamId} />);

        expect(await screen.findByText('Failed to load roster. Please try again.')).toBeInTheDocument();
    });

    test('adds a new player', async () => {
        axios.get.mockResolvedValueOnce({ data: [] });
        axios.post.mockResolvedValueOnce({
            data: { id: 3, name: 'New Player' },
        });

        render(<TeamRosterManagement teamId={mockTeamId} />);

        fireEvent.change(screen.getByPlaceholderText('New Player Name'), {
            target: { value: 'New Player' },
        });
        fireEvent.click(screen.getByText('Add Player'));

        await waitFor(() => {
            expect(screen.getByText('Player added successfully!')).toBeInTheDocument();
            expect(screen.getByText('New Player')).toBeInTheDocument();
        });
    });

    test('removes a player', async () => {
        axios.get.mockResolvedValueOnce({
            data: [{ id: 1, name: 'Player to Remove' }],
        });
        axios.delete.mockResolvedValueOnce({});

        render(<TeamRosterManagement teamId={mockTeamId} />);

        expect(await screen.findByText('Player to Remove')).toBeInTheDocument();
        fireEvent.click(screen.getByText('Remove'));

        await waitFor(() => {
            expect(screen.queryByText('Player to Remove')).not.toBeInTheDocument();
            expect(screen.getByText('Player removed successfully!')).toBeInTheDocument();
        });
    });

    test('displays error message if add player fails', async () => {
        axios.get.mockResolvedValueOnce({ data: [] });
        axios.post.mockRejectedValueOnce(new Error('Add player failed'));

        render(<TeamRosterManagement teamId={mockTeamId} />);

        fireEvent.change(screen.getByPlaceholderText('New Player Name'), {
            target: { value: 'Fail Player' },
        });
        fireEvent.click(screen.getByText('Add Player'));

        await waitFor(() => {
            expect(screen.getByText('Failed to add player. Please try again.')).toBeInTheDocument();
        });
    });

    test('displays loading message while fetching data', async () => {
        axios.get.mockResolvedValueOnce({ data: [] });

        render(<TeamRosterManagement teamId={mockTeamId} />);

        expect(screen.getByText('Loading...')).toBeInTheDocument();
        await waitFor(() => expect(screen.queryByText('Loading...')).not.toBeInTheDocument());
    });
});
// src/TeamRosterManagement.test.js
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from './services/teamService';
import TeamRosterManagement from './TeamRosterManagement';

jest.mock('./services/teamService');

describe('Player name validation', () => {
    const mockTeamId = '123';

    test('shows an error if the player name is empty', async () => {
        render(<TeamRosterManagement teamId={mockTeamId} />);
        fireEvent.change(screen.getByPlaceholderText('New Player Name'), { target: { value: ' ' } });
        fireEvent.click(screen.getByText('Add Player'));

        await waitFor(() => expect(screen.getByText('Player name cannot be empty.')).toBeInTheDocument());
    });

    test('shows an error if the player name is too short', async () => {
        render(<TeamRosterManagement teamId={mockTeamId} />);
        fireEvent.change(screen.getByPlaceholderText('New Player Name'), { target: { value: 'A' } });
        fireEvent.click(screen.getByText('Add Player'));

        await waitFor(() => expect(screen.getByText('Player name must be between 2 and 50 characters.')).toBeInTheDocument());
    });

    test('shows an error if the player name contains invalid characters', async () => {
        render(<TeamRosterManagement teamId={mockTeamId} />);
        fireEvent.change(screen.getByPlaceholderText('New Player Name'), { target: { value: 'Player123' } });
        fireEvent.click(screen.getByText('Add Player'));

        await waitFor(() => expect(screen.getByText('Player name can only contain letters and spaces.')).toBeInTheDocument());
    });

    test('shows an error if the player name is not unique', async () => {
        axios.getRoster.mockResolvedValueOnce({
            data: [{ id: 1, name: 'John Doe' }],
        });

        render(<TeamRosterManagement teamId={mockTeamId} />);

        await waitFor(() => screen.getByText('John Doe'));

        fireEvent.change(screen.getByPlaceholderText('New Player Name'), { target: { value: 'John Doe' } });
        fireEvent.click(screen.getByText('Add Player'));

        await waitFor(() => expect(screen.getByText('Player name must be unique.')).toBeInTheDocument());
    });
});
// src/TeamRosterManagement.test.js
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import teamService from './services/teamService';
import TeamRosterManagement from './TeamRosterManagement';

jest.mock('./services/teamService');

describe('TeamRosterManagement Network Error Handling', () => {
    const mockTeamId = '123';

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('displays an error if fetching roster fails', async () => {
        teamService.getRoster.mockRejectedValueOnce(new Error('Failed to fetch roster'));

        render(<TeamRosterManagement teamId={mockTeamId} />);

        expect(await screen.findByText('Failed to load roster. Please try again.')).toBeInTheDocument();
    });

    test('displays an error if adding a player fails', async () => {
        teamService.getRoster.mockResolvedValueOnce({ data: [] });
        teamService.addPlayer.mockRejectedValueOnce(new Error('Failed to add player'));

        render(<TeamRosterManagement teamId={mockTeamId} />);
        
        fireEvent.change(screen.getByPlaceholderText('New Player Name'), { target: { value: 'New Player' } });
        fireEvent.click(screen.getByText('Add Player'));

        await waitFor(() => expect(screen.getByText('Failed to add player. Please try again.')).toBeInTheDocument());
    });

    test('displays an error if removing a player fails', async () => {
        teamService.getRoster.mockResolvedValueOnce({
            data: [{ id: 1, name: 'Player to Remove' }],
        });
        teamService.removePlayer.mockRejectedValueOnce(new Error('Failed to remove player'));

        render(<TeamRosterManagement teamId={mockTeamId} />);

        fireEvent.click(screen.getByText('Remove'));

        await waitFor(() => expect(screen.getByText('Failed to remove player. Please try again.')).toBeInTheDocument());
    });
});
// src/TeamRosterManagement.test.js
describe('TeamRosterManagement Roster Size Limit', () => {
    const mockTeamId = '123';

    test('displays an error if trying to add a player when the roster is full', async () => {
        const fullRoster = Array.from({ length: 20 }, (_, i) => ({ id: i, name: `Player ${i + 1}` }));
        teamService.getRoster.mockResolvedValueOnce({ data: fullRoster });

        render(<TeamRosterManagement teamId={mockTeamId} />);

        expect(await screen.findByText('Player 20')).toBeInTheDocument();
        
        fireEvent.change(screen.getByPlaceholderText('New Player Name'), { target: { value: 'New Player' } });
        fireEvent.click(screen.getByText('Add Player'));

        await waitFor(() => expect(screen.getByText(`The roster is full. Maximum ${MAX_PLAYERS} players allowed.`)).toBeInTheDocument());
    });
});
