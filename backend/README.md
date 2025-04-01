# You-Gene Backend

The backend service for You-Gene, handling game logic, data persistence, and real-time features.

## Tech Stack

- Node.js with Express
- MongoDB for database
- JWT for authentication
- Socket.io for real-time features
- TypeScript for type safety

## Project Structure

```
backend/
├── src/
│   ├── controllers/  # Route controllers
│   ├── models/       # Database models
│   ├── routes/       # API routes
│   ├── services/     # Business logic
│   └── utils/        # Utility functions
├── tests/            # Test files
├── package.json
└── tsconfig.json
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

## API Documentation

The API documentation is available at `/api-docs` when running the server in development mode.

## Development TODOs

### Phase 1: Basic You-Gene System
- [ ] Set up basic Express server with TypeScript
- [ ] Implement MongoDB connection and basic models
- [ ] Create authentication system with JWT
- [ ] Implement basic monster CRUD operations
- [ ] Set up Socket.io for real-time features
- [ ] Create basic battle system API
- [ ] Implement simple breeding mechanics
- [ ] Add basic exploration zone endpoints
- [ ] Set up error handling middleware
- [ ] Add request validation
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

## Testing

Run tests with:
```bash
pnpm test
```

## Contributing

1. Create your feature branch (`git checkout -b feature/AmazingFeature`)
2. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
3. Push to the branch (`git push origin feature/AmazingFeature`)
4. Open a Pull Request

## License

This project is proprietary software. See the main project README for license details. 