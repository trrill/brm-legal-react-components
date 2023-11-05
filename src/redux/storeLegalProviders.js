import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducerLegalProviders';

export const store = configureStore({
  reducer: rootReducer,
});

export default store;
