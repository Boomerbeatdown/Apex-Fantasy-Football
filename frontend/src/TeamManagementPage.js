// src/TeamManagementPage.js
import React, { useState } from 'react';
import TeamCreationForm from './TeamCreationForm';
import TeamRosterManagement from './TeamRosterManagement';
import axios from './axiosConfig';

function TeamManagementPage({ leagueId }) {
    const [teamId, setTeamId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);  // Loading state for team creation
    const [error, setError] = useState(null);           // Error state for team creation

    const handleTeamCreated = async (teamData) => {
        setIsLoading(true);
        setError(null);
        try {
            // Example team creation API call
            const response = await axios.post(`/api/leagues/${leagueId}/teams/`, teamData);
            setTeamId(response.data.id);  // Set teamId on successful creation
        } catch (err) {
            setError("Failed to create team. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <h1>Team Management</h1>
            
            {error && <p style={{ color: 'red' }}>{error}</p>}
            
            {isLoading ? (
                <p>Creating team...</p>  // Loading indicator
            ) : (
                <TeamCreationForm leagueId={leagueId} onTeamCreated={handleTeamCreated} />
            )}
            
            {teamId ? (
                <TeamRosterManagement teamId={teamId} />
            ) : (
                <p>Please create a team to manage the roster.</p>  // Prompt to create a team
            )}
        </div>
    );
}

export default TeamManagementPage;
