
import { FETCH_TRANSPARENCY_FIRMS_START, FETCH_TRANSPARENCY_FIRMS_SUCCESS, FETCH_TRANSPARENCY_FIRMS_FAILURE, SET_FILTERED_TRANSPARENCY_FIRMS } from './typesTransparencyFirms';

export const fetchTransparencyFirmsStart = () => ({
  type: FETCH_TRANSPARENCY_FIRMS_START
});

export const fetchTransparencyFirmsSuccess = (transparencyFirms) => ({
	type: FETCH_TRANSPARENCY_FIRMS_SUCCESS,
	payload: transparencyFirms
});

export const fetchTransparencyFirmsFailure = (error) => ({
	type: FETCH_TRANSPARENCY_FIRMS_FAILURE,
	payload: error
});

export const setFilteredTransparencyFirms = (transparencyFirms) => ({
	type: SET_FILTERED_TRANSPARENCY_FIRMS,
	payload: transparencyFirms
});


/*
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
*/