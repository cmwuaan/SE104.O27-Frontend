import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './features/playerSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
  },
});
