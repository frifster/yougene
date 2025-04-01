# YouGene Backend

The backend service for YouGene, handling game logic, data persistence, and real-time features.

## Tech Stack

- Node.js with Express
- TypeScript for type safety
- MongoDB for database
- JWT for authentication
- Socket.io for real-time features
- Zod for request validation

## Project Structure

```
backend/
├── src/
│   ├── config/        # Configuration and environment variables
│   ├── controllers/   # Route controllers
│   ├── middleware/    # Express middleware
│   ├── models/        # Database models
│   ├── routes/        # API routes
│   ├── services/      # Business logic
│   ├── utils/         # Utility functions
│   └── index.ts       # Application entry point
├── tests/             # Test files
├── .env               # Environment variables
├── .env.example       # Example environment variables
├── package.json       # Project dependencies
└── tsconfig.json      # TypeScript configuration
```

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB
- pnpm (v8 or higher)

### Installation

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

## API Endpoints

### Health Check
- `GET /health` - Check API status

### Authentication
- `POST /api/v1/auth/register` - Register a new user
- `POST /api/v1/auth/login` - Login with credentials

### Monster Management
- `GET /api/v1/monsters` - Get all monsters
- `POST /api/v1/monsters` - Create a new monster
- `GET /api/v1/monsters/:id` - Get a specific monster
- `PUT /api/v1/monsters/:id` - Update a monster
- `DELETE /api/v1/monsters/:id` - Delete a monster

### Breeding System
- `POST /api/v1/breeding/breed` - Breed two monsters together

#### Monster Schema
```typescript
{
  name: string;        // Monster name
  level: number;       // Level (min: 1)
  hp: number;         // Hit points (min: 1)
  attack: number;     // Attack power (min: 0)
  defense: number;    // Defense power (min: 0)
  description: string; // Monster description
  parent1?: ObjectId; // Reference to first parent monster
  parent2?: ObjectId; // Reference to second parent monster
  generation: number; // Number of generations (starts at 0)
  createdAt: Date;    // Creation timestamp
  updatedAt: Date;    // Last update timestamp
}
```

#### Breeding Mechanics
The breeding system allows you to create new monsters by combining two existing monsters. Here's how it works:

1. **Parent Selection**: Choose two existing monsters to breed together
2. **Stat Inheritance**: 
   - Child stats are calculated as the average of both parents' stats
   - A random factor (0.8-1.2) is applied to add variation
   - Minimum values are enforced (HP ≥ 1, Attack ≥ 0, Defense ≥ 0)
3. **Child Monster**:
   - Starts at level 1
   - Name is based on the first parent's name (with "Jr." suffix)
   - Generation count increases based on the highest parent generation
   - Parent references are stored for lineage tracking

Example breeding request:
```json
POST /api/v1/breeding/breed
{
  "parent1Id": "monster1_id",
  "parent2Id": "monster2_id"
}
```

## Development TODOs

### Phase 1: Basic YouGene System
- [x] Set up basic Express server with TypeScript
- [x] Implement error handling middleware
- [x] Set up environment configuration
- [x] Configure CORS and basic middleware
- [x] Set up Socket.IO for real-time features
- [x] Implement MongoDB connection
- [x] Create authentication system with JWT
- [x] Implement basic monster CRUD operations
- [x] Create basic battle system API
- [x] Implement simple breeding mechanics
- [ ] Add basic exploration zone endpoints
- [ ] Add request validation with Zod
- [ ] Implement basic rate limiting

### Phase 2: Genetic Expansion
- [ ] Enhance monster models with genetic attributes
- [ ] Implement mutation system
- [ ] Add advanced breeding mechanics
- [ ] Create social features API (friends, trading)
- [ ] Implement advanced battle mechanics
- [ ] Add leaderboard system
- [ ] Set up caching layer
- [ ] Implement WebSocket events for real-time battles
- [ ] Add analytics tracking
- [ ] Implement backup system

### Phase 3: Full Gene-sis
- [ ] Create tournament system API
- [ ] Implement marketplace system
- [ ] Add cross-player breeding features
- [ ] Set up achievement system
- [ ] Implement advanced genetic algorithms
- [ ] Add admin dashboard API
- [ ] Create reporting system
- [ ] Implement anti-cheat measures
- [ ] Set up monitoring and logging
- [ ] Add performance optimizations

## Environment Variables

Required environment variables in `.env`:
```
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
MONGODB_URI=mongodb://localhost:27017/yougene
JWT_SECRET=your-secret-key-change-in-production
JWT_EXPIRES_IN=7d
```

## Development Scripts

- `pnpm dev` - Start development server with hot reload
- `pnpm build` - Build TypeScript files
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm test` - Run tests with Vitest

## Error Handling

The application uses a custom error handling system:
- `AppError` class for operational errors
- Global error handler middleware
- Standardized error response format

## Contributing

1. Create your feature branch (`git checkout -b feature/AmazingFeature`)
2. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
3. Push to the branch (`git push origin feature/AmazingFeature`)
4. Open a Pull Request

## License

This project is proprietary software. See the main project README for license details. 