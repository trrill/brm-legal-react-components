// actions.js

// Existing imports
import { FETCH_LEGAL_PROVIDERS_START, FETCH_LEGAL_PROVIDERS_SUCCESS, FETCH_LEGAL_PROVIDERS_FAILURE, SET_FILTERED_LEGAL_PROVIDERS, SET_SEARCH_TERM, PERFORM_SEARCH } from './types';

export const fetchLegalProvidersStart = () => ({
  type: FETCH_LEGAL_PROVIDERS_START
});

export const fetchLegalProvidersSuccess = (legalProviders) => ({
  type: FETCH_LEGAL_PROVIDERS_SUCCESS,
  payload: legalProviders
});

export const fetchLegalProvidersFailure = (error) => ({
  type: FETCH_LEGAL_PROVIDERS_FAILURE,
  payload: error
});

export const setFilteredLegalProviders = (legalProviders) => ({
  type: SET_FILTERED_LEGAL_PROVIDERS,
  payload: legalProviders
});

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
