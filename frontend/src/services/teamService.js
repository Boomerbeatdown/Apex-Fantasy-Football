// src/services/teamService.js
import axios from '../axiosConfig';

const getRoster = (teamId) => axios.get(`/api/teams/${teamId}/players/`);
const addPlayer = (teamId, playerData) => axios.post(`/api/teams/${teamId}/players/`, playerData);
const removePlayer = (teamId, playerId) => axios.delete(`/api/teams/${teamId}/players/${playerId}/`);

export default { getRoster, addPlayer, removePlayer };
// src/services/teamService.js
import { axios, retryRequest } from './axiosConfig';

const getRoster = (teamId) => retryRequest(() => axios.get(`/api/teams/${teamId}/players/`));
const addPlayer = (teamId, playerData) => retryRequest(() => axios.post(`/api/teams/${teamId}/players/`, playerData));
const removePlayer = (teamId, playerId) => retryRequest(() => axios.delete(`/api/teams/${teamId}/players/${playerId}/`));

export default { getRoster, addPlayer, removePlayer };
