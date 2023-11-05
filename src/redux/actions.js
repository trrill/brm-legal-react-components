import { SET_SEARCH_TERM, PERFORM_SEARCH } from './types';

export const setSearchTerm = (term) => ({
  type: SET_SEARCH_TERM,
  payload: term,
});

export const performSearch = (searchTerm, searchFunction) => {
  return {
    type: PERFORM_SEARCH,
    payload: {
      searchTerm,
      searchFunction, // Pass the search function as part of the payload
    },
  };
};
