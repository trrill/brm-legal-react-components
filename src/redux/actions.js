// actions.js
import { SET_SEARCH_TERM, PERFORM_SEARCH } from './types';

export const setSearchTerm = (term) => ({
  type: SET_SEARCH_TERM,
  payload: term,
});

export const performSearch = (searchTerm, searchFunction) => {
  return (dispatch) => {
    // Execute the search function specific to each app
    const results = searchFunction(searchTerm);

    // Dispatch the results to the store
    dispatch({
      type: 'SET_SEARCH_RESULTS',
      payload: results,
    });
  };
};