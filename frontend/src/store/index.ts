import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import battleReducer from './slices/battleSlice';
import monsterReducer from './slices/monsterSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    monster: monsterReducer,
    battle: battleReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
