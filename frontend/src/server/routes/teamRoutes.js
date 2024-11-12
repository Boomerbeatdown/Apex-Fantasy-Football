// server/routes/teamRoutes.js
const express = require('express');
const router = express.Router();
const { Team, Player } = require('../models'); // Assuming Sequelize models are used
const MAX_PLAYERS = 20;

router.post('/teams/:teamId/players', async (req, res) => {
    const { teamId } = req.params;
    const { name } = req.body;

    try {
        const team = await Team.findByPk(teamId, {
            include: [{ model: Player }]
        });

        if (!team) {
            return res.status(404).json({ error: 'Team not found' });
        }

        if (team.players.length >= MAX_PLAYERS) {
            return res.status(400).json({ error: `The roster is full. Maximum ${MAX_PLAYERS} players allowed.` });
        }

        const newPlayer = await Player.create({ name, teamId });
        res.status(201).json(newPlayer);
    } catch (error) {
        console.error("Error adding player:", error);
        res.status(500).json({ error: 'Failed to add player' });
    }
});

module.exports = router;
// server/routes/teamRoutes.js
const express = require('express');
const router = express.Router();
const { Team, Player } = require('../models');

const MAX_PLAYERS = 20;

router.post('/teams/:teamId/players', async (req, res) => {
    const { teamId } = req.params;
    const { name } = req.body;

    try {
        const team = await Team.findByPk(teamId, {
            include: [{ model: Player }]
        });

        if (!team) {
            return res.status(404).json({ error: 'Team not found' });
        }

        // Check if the roster is full
        if (team.players.length >= MAX_PLAYERS) {
            return res.status(400).json({ error: `The roster is full. Maximum ${MAX_PLAYERS} players allowed.` });
        }

        // Check if a player with the same name already exists in the team
        const duplicatePlayer = team.players.find(
            (player) => player.name.toLowerCase() === name.toLowerCase()
        );

        if (duplicatePlayer) {
            return res.status(400).json({ error: 'A player with this name already exists in the team.' });
        }

        // If no duplicate, add the new player
        const newPlayer = await Player.create({ name, teamId });
        res.status(201).json(newPlayer);
    } catch (error) {
        console.error("Error adding player:", error);
        res.status(500).json({ error: 'Failed to add player' });
    }
});

module.exports = router;
