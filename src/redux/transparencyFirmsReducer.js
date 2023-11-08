import { FETCH_TRANSPARENCY_FIRMS_START, FETCH_TRANSPARENCY_FIRMS_SUCCESS, SET_FILTERED_TRANSPARENCY_FIRMS } from './typesTransparencyFirms';

const initialState = {
	transparencyFirms: [],
  filteredTransparencyFirms: [],
	isFetching: false,
}; 

const transparencyFirmsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TRANSPARENCY_FIRMS_START:
      return {
        ...state,
        isFetching: true,
      };
    case FETCH_TRANSPARENCY_FIRMS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        transparencyFirms: action.payload,
      };
    case SET_FILTERED_TRANSPARENCY_FIRMS:
      return {
        ...state,
        filteredTransparencyFirms: action.payload,
      };  
    default:
      return state;
  }
};

export default transparencyFirmsReducer;
