// src/components/LeagueList.test.js

import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import LeagueList from './LeagueList';

jest.mock('axios');  // Mock axios for controlled responses

test('renders leagues list from API', async () => {
    const leagues = [
        { id: 1, name: 'League 1' },
        { id: 2, name: 'League 2' },
    ];

    axios.get.mockResolvedValue({ data: leagues });  // Mock successful API response

    render(<LeagueList />);

    // Wait for the leagues to load and assert that they are displayed
    await waitFor(() => {
        leagues.forEach((league) => {
            expect(screen.getByText(new RegExp(league.name, 'i'))).toBeInTheDocument();
        });
    });
});

test('displays error message on API failure', async () => {
    axios.get.mockRejectedValue(new Error('Failed to fetch leagues'));  // Mock error response

    render(<LeagueList />);

    // Check if error message is displayed
    await waitFor(() => {
        expect(screen.getByText(/failed to load leagues/i)).toBeInTheDocument();
    });
});
