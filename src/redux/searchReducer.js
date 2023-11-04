// searchReducer.js
import { SET_SEARCH_TERM, PERFORM_SEARCH } from './types';

const initialState = {
  searchTerm: '',
  searchResults: [],
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SEARCH_TERM:
      return {
        ...state,
        searchTerm: action.payload,
      };
    case PERFORM_SEARCH:
      // Here you would add your logic to perform the search based on searchTerm
      return {
        ...state,
        searchResults: [], // Replace with actual search results
      };
    default:
      return state;
  }
};

export default searchReducer;
