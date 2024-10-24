const initialState = {
    leagues: [],
    loading: false,
    error: null,
  };
  
  export const leagueReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_LEAGUES_REQUEST':
        return { ...state, loading: true };
      case 'FETCH_LEAGUES_SUCCESS':
        return { ...state, leagues: action.payload, loading: false };
      case 'FETCH_LEAGUES_FAIL':
        return { ...state, error: action.payload, loading: false };
      default:
        return state;
    }
  };
  