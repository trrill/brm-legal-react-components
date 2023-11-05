// rootReducer.js
import { combineReducers } from 'redux';
import transparencyFirmsReducer from './transparencyFirmsReducer';
import searchReducer from './searchReducer';


const rootReducer = combineReducers({
  search: searchReducer,
  transparencyFirms: transparencyFirmsReducer,
});

export default rootReducer;
