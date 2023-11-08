import { FETCH_LEGAL_PROVIDERS_START, FETCH_LEGAL_PROVIDERS_SUCCESS, SET_FILTERED_LEGAL_PROVIDERS } from './types';

const initialState = {
	legalProviders: [],
  filteredLegalProviders: [],
	isFetching: false,
}; 

const legalProvidersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LEGAL_PROVIDERS_START:
      return {
        ...state,
        isFetching: true,
      };
    case FETCH_LEGAL_PROVIDERS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        legalProviders: action.payload,
      };
    case SET_FILTERED_LEGAL_PROVIDERS:
      return {
        ...state,
        filteredLegalProviders: action.payload,
      };  
    default:
      return state;
  }
};

export default legalProvidersReducer;
