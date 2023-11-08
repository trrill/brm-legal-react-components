import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducerTransparencyFirms';

export const store = configureStore({
  reducer: rootReducer,
});

export default store;
