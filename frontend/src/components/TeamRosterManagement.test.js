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
