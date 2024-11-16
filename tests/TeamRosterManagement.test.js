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

        if (team.players.length >= MAX_PLAYERS) {
            return res.status(400).json({ error: `The roster is full. Maximum ${MAX_PLAYERS} players allowed.` });
        }

        const duplicatePlayer = team.players.find(
            (player) => player.name.toLowerCase() === name.toLowerCase()
        );

        if (duplicatePlayer) {
            return res.status(400).json({ error: 'A player with this name already exists in the team.' });
        }

        const newPlayer = await Player.create({ name, teamId });
        res.status(201).json(newPlayer);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add player' });
    }
});

module.exports = router;
