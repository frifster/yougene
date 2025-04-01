# State Management Documentation

## Overview

YouGene uses Redux Toolkit for global state management, with a focus on type safety and performance. The store is organized into feature-based slices for better maintainability.

## Store Structure

```typescript
RootState {
  auth: AuthState;
  monsters: MonstersState;
  battle: BattleState;
  collection: CollectionState;
  lab: LabState;
  ui: UIState;
}
```

## Slices

### Auth Slice
```typescript
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

// Actions
authSlice.actions = {
  login: (credentials: LoginCredentials) => void;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
  resetPassword: (email: string) => void;
}
```

### Monsters Slice
```typescript
interface MonstersState {
  monsters: Record<string, Monster>;
  selectedMonster: string | null;
  loading: boolean;
  error: string | null;
}

// Actions
monstersSlice.actions = {
  fetchMonsters: () => void;
  selectMonster: (id: string) => void;
  updateMonster: (monster: Monster) => void;
  deleteMonster: (id: string) => void;
}
```

### Battle Slice
```typescript
interface BattleState {
  activeBattle: Battle | null;
  history: BattleHistory[];
  loading: boolean;
  error: string | null;
}

// Actions
battleSlice.actions = {
  startBattle: (participants: BattleParticipants) => void;
  endBattle: (result: BattleResult) => void;
  updateBattleState: (update: Partial<Battle>) => void;
}
```

### Collection Slice
```typescript
interface CollectionState {
  collection: MonsterCollection;
  filters: CollectionFilters;
  sorting: SortingOptions;
  loading: boolean;
}

// Actions
collectionSlice.actions = {
  addToCollection: (monster: Monster) => void;
  removeFromCollection: (monsterId: string) => void;
  updateFilters: (filters: Partial<CollectionFilters>) => void;
  setSorting: (options: SortingOptions) => void;
}
```

### Lab Slice
```typescript
interface LabState {
  activeExperiment: Experiment | null;
  geneLibrary: GeneLibrary;
  breedingPair: [Monster | null, Monster | null];
  loading: boolean;
}

// Actions
labSlice.actions = {
  startExperiment: (config: ExperimentConfig) => void;
  completeExperiment: (result: ExperimentResult) => void;
  selectBreedingPair: (monsters: [Monster, Monster]) => void;
}
```

### UI Slice
```typescript
interface UIState {
  theme: 'light' | 'dark';
  toasts: Toast[];
  modals: Modal[];
  loading: Record<string, boolean>;
}

// Actions
uiSlice.actions = {
  setTheme: (theme: 'light' | 'dark') => void;
  showToast: (toast: Toast) => void;
  showModal: (modal: Modal) => void;
  setLoading: (key: string, loading: boolean) => void;
}
```

## Custom Hooks

### useAuth
```typescript
const { user, isAuthenticated, login, logout } = useAuth();
```
Handles authentication state and actions.

### useMonster
```typescript
const { monster, updateMonster, deleteMonster } = useMonster(id);
```
Manages individual monster data and actions.

### useBattle
```typescript
const { battle, startBattle, endBattle } = useBattle();
```
Handles battle state and actions.

### useCollection
```typescript
const { collection, filters, updateFilters } = useCollection();
```
Manages monster collection state and filtering.

## Best Practices

1. **State Organization**
   - Keep state normalized
   - Use selectors for derived data
   - Minimize state duplication

2. **Performance**
   - Use RTK Query for API calls
   - Implement proper memoization
   - Avoid storing computed values

3. **Type Safety**
   - Define proper interfaces
   - Use TypeScript strict mode
   - Leverage Redux Toolkit types

4. **Error Handling**
   - Handle async errors properly
   - Show user-friendly error messages
   - Log errors for debugging

5. **Testing**
   - Test reducers independently
   - Mock async actions
   - Test selectors with different states

## Example Usage

```typescript
// In a component
import { useDispatch, useSelector } from 'react-redux';
import { selectMonster, updateMonster } from '@/store/monstersSlice';

function MonsterDetail({ id }: { id: string }) {
  const dispatch = useDispatch();
  const monster = useSelector(state => selectMonster(state, id));
  
  const handleUpdate = (updates: Partial<Monster>) => {
    dispatch(updateMonster({ id, ...updates }));
  };

  return (
    // Component JSX
  );
}
```

## Middleware

1. **API Middleware**
   - Handles API calls
   - Manages request/response lifecycle
   - Implements retry logic

2. **Logger Middleware**
   - Development logging
   - Action tracking
   - Performance monitoring

3. **Persistence Middleware**
   - Local storage sync
   - State rehydration
   - Cache management 