// src/components/LeagueIntegration.test.js

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import LeagueCreationForm from './LeagueCreationForm';
import LeagueList from './LeagueList';

jest.mock('axios');

test('creates a new league and verifies it appears in the league list', async () => {
    axios.post.mockResolvedValue({ data: { id: 1, name: 'New League' } });
    axios.get.mockResolvedValue({ data: [{ id: 1, name: 'New League' }] });

    render(<LeagueCreationForm />);
    render(<LeagueList />);

    // Fill out form and submit
    fireEvent.change(screen.getByPlaceholderText(/League Name/i), { target: { value: 'New League' } });
    fireEvent.click(screen.getByRole('button', { name: /Create League/i }));

    // Verify success message
    expect(await screen.findByText(/League created successfully!/i)).toBeInTheDocument();

    // Wait for LeagueList to update with the new league
    await waitFor(() => {
        expect(screen.getByText(/New League/i)).toBeInTheDocument();
    });
});
