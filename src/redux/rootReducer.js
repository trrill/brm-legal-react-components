// rootReducer.js
import { combineReducers } from 'redux';
import legalProvidersReducer from './legalProvidersReducer';
import searchReducer from './searchReducer';


const rootReducer = combineReducers({
  search: searchReducer,
  legalProviders: legalProvidersReducer,
});

export default rootReducer;
