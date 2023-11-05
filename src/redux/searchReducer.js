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
      const { searchTerm, searchFunction } = action.payload;

      // Execute the provided search function with the searchTerm
      const searchResults = searchFunction(searchTerm);

      return {
        ...state,
        searchResults: searchResults,
      };
    default:
      return state;
  }
};

export default searchReducer;
