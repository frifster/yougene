import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Achievement {
  id: string;
  name: string;
  description: string;
  progress: number;
  maxProgress: number;
  completed: boolean;
}

interface User {
  id: string;
  username: string;
  email: string;
  level: number;
  credits: number;
  achievements: Achievement[];
  createdAt: string;
  updatedAt: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  loading: false,
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      localStorage.setItem('token', action.payload.token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
    },
    updateUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    updateCredits: (state, action: PayloadAction<number>) => {
      if (state.user) {
        state.user.credits = action.payload;
      }
    },
    updateAchievement: (state, action: PayloadAction<{ id: string; progress: number; completed: boolean }>) => {
      if (state.user) {
        const achievement = state.user.achievements.find(a => a.id === action.payload.id);
        if (achievement) {
          achievement.progress = action.payload.progress;
          achievement.completed = action.payload.completed;
        }
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    }
  }
});

export const {
  login,
  logout,
  updateUser,
  updateCredits,
  updateAchievement,
  setLoading,
  setError
} = authSlice.actions;

export default authSlice.reducer; 