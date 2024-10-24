import { combineReducers } from 'redux';
import { leagueReducer } from './leagueReducer';  // Ensure this path is correct

// If you have additional reducers, you can import them here

const rootReducer = combineReducers({
  leagues: leagueReducer,  // Handles leagues state
  // Add other reducers here as needed
});

export default rootReducer;

