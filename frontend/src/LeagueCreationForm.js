// src/LeagueCreationForm.js
import { useState } from 'react';
import axios from './axiosConfig';

function LeagueCreationForm() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [rules, setRules] = useState('');
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        try {
            const response = await axios.post('/api/leagues/', {
                name,
                description,
                scoring_system: rules  // Field name aligned with backend
            });
            setMessage("League created successfully!");
            setName('');          // Clear form fields
            setDescription('');
            setRules('');
        } catch (error) {
            const errorMsg = error.response?.data?.detail || "Failed to create league. Please try again.";
            setMessage(errorMsg);
            console.error("Error creating league:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="League Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <input
                type="text"
                placeholder="Rules (Scoring System)"
                value={rules}
                onChange={(e) => setRules(e.target.value)}
            />
            <button type="submit" disabled={loading}>
                {loading ? "Creating..." : "Create League"}
            </button>
            {message && <p className={loading ? "info" : "error"}>{message}</p>}
        </form>
    );
}

export default LeagueCreationForm;

