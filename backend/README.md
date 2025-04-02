# YouGene Backend

The backend service for YouGene, handling monster management, breeding mechanics, and game logic.

## Tech Stack

- Node.js with Express
- TypeScript
- MongoDB with Mongoose
- JWT for authentication
- Socket.io for real-time features

## Project Structure

```
backend/
├── src/
│   ├── config/         # Configuration files
│   ├── controllers/    # Route controllers
│   │   └── monsterController.ts
│   ├── middleware/     # Custom middleware
│   ├── models/         # Database models
│   │   └── Monster.ts
│   ├── routes/         # API routes
│   │   └── monsterRoutes.ts
│   ├── services/       # Business logic
│   │   ├── MonsterService.ts
│   │   └── BreedingService.ts
│   ├── utils/          # Utility functions
│   └── index.ts        # Application entry point
├── .env.example        # Environment variables template
├── package.json
└── tsconfig.json
```

## Features

### Monster Management
- CRUD operations for monsters
- Genetic property tracking
- Stat management
- Ability system

### Breeding System
- Advanced genetic inheritance
- Parent compatibility checking
- Offspring generation with:
  - Genetic traits inheritance
  - Stat inheritance with variation
  - Ability combination
  - Type inheritance
  - Name generation

### Genetic Mechanics
- Dominant and recessive genes
- Mutation rate system
- Genetic stability calculation
- Generation tracking

## API Endpoints

### Monsters

#### GET /api/monsters
Get all monsters in the collection.

**Response:**
```typescript
{
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
  dominantGenes: string[];
  recessiveGenes: string[];
  mutationRate: number;
  parent1?: string;
  parent2?: string;
  generation: number;
  createdAt: string;
  updatedAt: string;
}[]
```

#### GET /api/monsters/:id
Get a specific monster by ID.

**Response:**
```typescript
{
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
  dominantGenes: string[];
  recessiveGenes: string[];
  mutationRate: number;
  parent1?: string;
  parent2?: string;
  generation: number;
  createdAt: string;
  updatedAt: string;
}
```

#### POST /api/monsters
Create a new monster.

**Request Body:**
```typescript
{
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
  dominantGenes: string[];
  recessiveGenes: string[];
  mutationRate: number;
  parent1?: string;
  parent2?: string;
  generation: number;
}
```

#### PUT /api/monsters/:id
Update a monster.

**Request Body:** Same as POST, all fields optional.

#### DELETE /api/monsters/:id
Delete a monster.

### Breeding

#### POST /api/monsters/breed
Breed two monsters.

**Request Body:**
```typescript
{
  parent1Id: string;
  parent2Id: string;
}
```

**Response:**
```typescript
{
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
  dominantGenes: string[];
  recessiveGenes: string[];
  mutationRate: number;
  parent1: string;
  parent2: string;
  generation: number;
  createdAt: string;
  updatedAt: string;
}
```

## Breeding Mechanics

### Genetic Stability
- Base stability is average of parents
- Reduced by generation difference (5% per generation)
- Reduced by type incompatibility (10% for different types)
- Range: 0-100%

### Mutation Rate
- Base rate is average of parents
- Increased by generation difference (2% per generation)
- Increased by type incompatibility (5% for different types)
- Range: 0-100%

### Gene Inheritance
- Dominant genes: 2-3 genes from combined parent genes
- Recessive genes: 1-2 genes from combined parent genes
- Random selection from available genes

### Stat Inheritance
- Base stats are average of parents
- Random variation of ±10%
- Minimum values enforced

### Ability Inheritance
- Combined abilities from both parents
- Random selection of 2-3 abilities
- No duplicates

## Environment Variables

Create a `.env` file based on `.env.example`:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/yougene
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```

## Getting Started

1. Install dependencies:
```bash
pnpm install
```

2. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

3. Start the development server:
```bash
pnpm dev
```

## Development

### Scripts
- `pnpm dev`: Start development server with hot reload
- `pnpm build`: Build the project
- `pnpm start`: Start production server
- `pnpm test`: Run tests
- `pnpm lint`: Run linter

### Code Style
- Follow TypeScript best practices
- Use meaningful variable and function names
- Add JSDoc comments for public functions
- Keep functions focused and small

### Testing
- Write unit tests for services
- Write integration tests for API endpoints
- Use Jest and Supertest

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

This project is proprietary software. See the main README for license details. 