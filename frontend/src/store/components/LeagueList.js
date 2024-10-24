import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLeagues } from '../actions/leagueActions';

const LeagueList = () => {
  const dispatch = useDispatch();
  const leagues = useSelector((state) => state.leagues.leagues);
  const loading = useSelector((state) => state.leagues.loading);
  const error = useSelector((state) => state.leagues.error);

  useEffect(() => {
    dispatch(fetchLeagues());
  }, [dispatch]);

  return (
    <div>
      <h1>Leagues</h1>
      {loading && <p>Loading leagues...</p>}
      {error && <p>Error: {error}</p>}
      <ul>
        {leagues.map((league) => (
          <li key={league.id}>{league.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default LeagueList;
