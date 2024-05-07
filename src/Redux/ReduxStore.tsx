import { configureStore } from '@reduxjs/toolkit';
import { bookSlice } from './ContactSlice';

export const store = configureStore({
  reducer: {
    book: bookSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>; 
export type AppDispatch = typeof store.dispatch;