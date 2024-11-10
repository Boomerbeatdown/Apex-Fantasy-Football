// src/LeagueList.js
import { useEffect, useState } from 'react';
import axios from './axiosConfig';  // Use the customized Axios instance

function LeagueList() {
    const [leagues, setLeagues] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLeagues = async () => {
            try {
                const response = await axios.get('/api/leagues/');
                setLeagues(response.data);
            } catch (error) {
                setError("Failed to load leagues.");
                console.error("Error fetching leagues:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchLeagues();
    }, []);

    if (isLoading) return <p>Loading leagues...</p>;
    if (error) return <p className="error">{error}</p>;

    return (
        <div>
            <h1>Your Leagues</h1>
            {leagues.length > 0 ? (
                <ul>
                    {leagues.map((league) => (
                        <li key={league.id}>{league.name}</li>
                    ))}
                </ul>
            ) : (
                <p>No leagues found.</p>
            )}
        </div>
    );
}

export default LeagueList;
