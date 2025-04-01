import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Monster } from './monsterSlice';

interface BattleState {
  activeBattle: {
    id: string;
    playerMonster: Monster | null;
    opponentMonster: Monster | null;
    status: 'idle' | 'in_progress' | 'completed';
    result: 'win' | 'loss' | 'draw' | null;
    rounds: BattleRound[];
  } | null;
  battleHistory: BattleHistory[];
  loading: boolean;
  error: string | null;
}

interface BattleRound {
  roundNumber: number;
  playerAction: string;
  opponentAction: string;
  damageDealt: number;
  damageReceived: number;
  statusEffects: string[];
}

interface BattleHistory {
  id: string;
  playerMonster: Monster;
  opponentMonster: Monster;
  result: 'win' | 'loss' | 'draw';
  date: string;
  rounds: BattleRound[];
}

const initialState: BattleState = {
  activeBattle: null,
  battleHistory: [],
  loading: false,
  error: null,
};

const battleSlice = createSlice({
  name: 'battle',
  initialState,
  reducers: {
    startBattle: (
      state,
      action: PayloadAction<{ id: string; playerMonster: Monster; opponentMonster: Monster }>
    ) => {
      state.activeBattle = {
        id: action.payload.id,
        playerMonster: action.payload.playerMonster,
        opponentMonster: action.payload.opponentMonster,
        status: 'in_progress',
        result: null,
        rounds: [],
      };
    },
    updateBattleRound: (state, action: PayloadAction<BattleRound>) => {
      if (state.activeBattle) {
        state.activeBattle.rounds.push(action.payload);
      }
    },
    endBattle: (state, action: PayloadAction<{ result: 'win' | 'loss' | 'draw' }>) => {
      if (state.activeBattle) {
        state.activeBattle.status = 'completed';
        state.activeBattle.result = action.payload.result;

        // Add to battle history
        state.battleHistory.unshift({
          id: state.activeBattle.id,
          playerMonster: state.activeBattle.playerMonster!,
          opponentMonster: state.activeBattle.opponentMonster!,
          result: action.payload.result,
          date: new Date().toISOString(),
          rounds: state.activeBattle.rounds,
        });
      }
    },
    clearActiveBattle: state => {
      state.activeBattle = null;
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
  startBattle,
  updateBattleRound,
  endBattle,
  clearActiveBattle,
  setLoading,
  setError,
} = battleSlice.actions;

export default battleSlice.reducer;
