import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Monster {
  id: string;
  name: string;
  type: string;
  level: number;
  geneticStability: number;
  abilities: string[];
  stats: {
    health: number;
    attack: number;
    defense: number;
    speed: number;
  };
  parentIds?: string[];
  createdAt: string;
  updatedAt: string;
  // Genetic properties
  dominantGenes: string[];
  recessiveGenes: string[];
  mutationRate: number;
}

interface MonsterState {
  collection: Monster[];
  selectedMonster: Monster | null;
  loading: boolean;
  error: string | null;
}

const initialState: MonsterState = {
  collection: [],
  selectedMonster: null,
  loading: false,
  error: null,
};

const monsterSlice = createSlice({
  name: 'monster',
  initialState,
  reducers: {
    setCollection: (state, action: PayloadAction<Monster[]>) => {
      state.collection = action.payload;
    },
    addMonster: (state, action: PayloadAction<Monster>) => {
      state.collection.push(action.payload);
    },
    updateMonster: (state, action: PayloadAction<Monster>) => {
      const index = state.collection.findIndex(m => m.id === action.payload.id);
      if (index !== -1) {
        state.collection[index] = action.payload;
      }
    },
    deleteMonster: (state, action: PayloadAction<string>) => {
      state.collection = state.collection.filter(m => m.id !== action.payload);
    },
    setSelectedMonster: (state, action: PayloadAction<Monster | null>) => {
      state.selectedMonster = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setCollection,
  addMonster,
  updateMonster,
  deleteMonster,
  setSelectedMonster,
  setLoading,
  setError,
} = monsterSlice.actions;

export default monsterSlice.reducer;
