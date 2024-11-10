// src/components/LeagueCreationForm.test.js

import { render, screen, fireEvent } from '@testing-library/react';
import axios from 'axios';
import LeagueCreationForm from './LeagueCreationForm';

jest.mock('axios');

test('renders league creation form and submits data', async () => {
    render(<LeagueCreationForm />);

    // Verify form elements are present
    const nameInput = screen.getByPlaceholderText(/League Name/i);
    const descriptionInput = screen.getByPlaceholderText(/Description/i);
    const submitButton = screen.getByRole('button', { name: /Create League/i });

    // Enter values and submit form
    fireEvent.change(nameInput, { target: { value: 'Test League' } });
    fireEvent.change(descriptionInput, { target: { value: 'Test description' } });
    fireEvent.click(submitButton);

    // Mock API response
    axios.post.mockResolvedValue({ data: { name: 'Test League' } });

    // Check for confirmation message after submission
    expect(await screen.findByText(/League created successfully!/i)).toBeInTheDocument();
});
