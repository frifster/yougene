# YouGene Frontend

The frontend application for YouGene, a monster breeding game built with React and TypeScript.

## Tech Stack

- React 18 with TypeScript
- Vite for build tooling
- TailwindCSS for styling
- Framer Motion for animations
- React Router for navigation
- Axios for API communication

## Project Structure

```
frontend/
├── src/
│   ├── api/           # API service layer
│   │   └── monsterApi.ts
│   ├── components/    # Reusable components
│   │   ├── common/    # Shared components
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   └── Loading.tsx
│   │   └── monsters/  # Monster-specific components
│   │       ├── MonsterCard.tsx
│   │       ├── MonsterGrid.tsx
│   │       ├── MonsterViewer.tsx
│   │       ├── MonsterBreeding.tsx
│   │       └── MonsterBattle.tsx
│   ├── pages/         # Page components
│   │   ├── Home.tsx
│   │   ├── MonsterCollection.tsx
│   │   ├── MonsterBreeding.tsx
│   │   └── MonsterBattle.tsx
│   ├── types/         # TypeScript type definitions
│   │   └── monster.ts
│   ├── utils/         # Utility functions
│   ├── App.tsx
│   └── main.tsx
├── public/            # Static assets
├── index.html
├── package.json
├── tailwind.config.js
└── tsconfig.json
```

## Features

### Monster Collection
- View all monsters in a grid layout
- Detailed monster viewer with stats and abilities
- Sort and filter monsters by type and level
- Responsive design for all screen sizes

### Breeding System
- Select parent monsters for breeding
- View genetic compatibility and inheritance
- Real-time breeding preview
- Animated breeding process
- Offspring stats and abilities display

### Battle System
- Turn-based combat interface
- Real-time battle status updates
- Animated battle effects
- Battle log viewer
- Victory/defeat screens

### UI/UX Features
- Smooth animations and transitions
- Responsive design
- Dark/light theme support
- Loading states and error handling
- Toast notifications for actions

## Components

### MonsterCard
Displays basic monster information in a card format.
```typescript
interface MonsterCardProps {
  monster: Monster;
  onClick?: (monster: Monster) => void;
  selected?: boolean;
}
```

### MonsterGrid
Grid layout for displaying multiple monsters.
```typescript
interface MonsterGridProps {
  monsters: Monster[];
  onMonsterClick?: (monster: Monster) => void;
  selectedMonsterId?: string;
}
```

### MonsterViewer
Detailed view of a single monster.
```typescript
interface MonsterViewerProps {
  monster: Monster;
  onClose?: () => void;
}
```

### MonsterBreeding
Interface for breeding two monsters.
```typescript
interface MonsterBreedingProps {
  availableMonsters: Monster[];
  onBreed: (offspring: Monster) => void;
}
```

### MonsterBattle
Battle interface for two monsters.
```typescript
interface MonsterBattleProps {
  monster1: Monster;
  monster2: Monster;
  onBattleEnd: (winner: Monster) => void;
}
```

## API Integration

The frontend communicates with the backend through the `monsterApi` service:

```typescript
// Example API calls
const getAllMonsters = async (): Promise<Monster[]> => {
  const response = await axios.get('/api/monsters');
  return response.data;
};

const breedMonsters = async (parent1Id: string, parent2Id: string): Promise<Monster> => {
  const response = await axios.post('/api/monsters/breed', {
    parent1Id,
    parent2Id
  });
  return response.data;
};
```

## Getting Started

1. Install dependencies:
```bash
pnpm install
```

2. Start the development server:
```bash
pnpm dev
```

3. Build for production:
```bash
pnpm build
```

## Development

### Scripts
- `pnpm dev`: Start development server
- `pnpm build`: Build for production
- `pnpm preview`: Preview production build
- `pnpm lint`: Run ESLint
- `pnpm test`: Run tests

### Code Style
- Follow TypeScript best practices
- Use functional components with hooks
- Implement proper prop types
- Keep components focused and small
- Use meaningful variable names

### State Management
- Use React hooks for local state
- Implement proper loading states
- Handle errors gracefully
- Use context for global state when needed

### Testing
- Write unit tests for components
- Test user interactions
- Mock API calls
- Test error scenarios

## Environment Variables

Create a `.env` file in the frontend directory:

```env
VITE_API_URL=http://localhost:3000
VITE_WS_URL=ws://localhost:3000
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

This project is proprietary software. See the main README for license details. 