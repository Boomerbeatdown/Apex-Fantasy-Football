import React from 'react';
import LeagueList from './components/LeagueList'; // Make sure this path is correct

const App = () => {
  return (
    <div>
      <h1>Welcome to the League App</h1>
      <LeagueList />  {/* Ensure LeagueList is working */}
    </div>
  );
};

export default App;

