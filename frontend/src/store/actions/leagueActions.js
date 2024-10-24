import axios from 'axios';

export const fetchLeagues = () => async (dispatch) => {
  dispatch({ type: 'FETCH_LEAGUES_REQUEST' }); // Start the loading state
  try {
    const res = await axios.get('/api/fantasy/'); // Adjust the URL based on your backend
    dispatch({ type: 'FETCH_LEAGUES_SUCCESS', payload: res.data });
  } catch (err) {
    dispatch({ type: 'FETCH_LEAGUES_FAIL', payload: err.message });
  }
};
