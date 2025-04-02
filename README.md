# YouGene: Monster Fusion Frontier

A web-based monster collection, breeding, and battle game featuring interactive 3D graphics. Players explore various biomes to catch wild monsters, then use the revolutionary "YouGene Technology" to breed and fuse them into powerful new creatures.

## Project Structure

```
yougene/
├── frontend/           # React + TypeScript frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   │   ├── monsters/  # Monster-related components
│   │   │   │   ├── MonsterCard.tsx    # Basic monster display
│   │   │   │   ├── MonsterGrid.tsx    # Grid of monsters
│   │   │   │   ├── MonsterViewer.tsx  # Detailed monster view
│   │   │   │   ├── MonsterBreeding.tsx # Breeding interface
│   │   │   │   └── MonsterBattle.tsx  # Battle system
│   │   │   ├── layout/    # Layout components
│   │   │   ├── ui/        # UI components
│   │   │   └── auth/      # Authentication components
│   │   ├── pages/        # Page components
│   │   ├── assets/       # Static assets (images, models)
│   │   ├── utils/        # Utility functions
│   │   ├── store/        # Redux store configuration
│   │   ├── api/          # API services
│   │   └── types/        # TypeScript type definitions
│   └── package.json
│
└── backend/           # Node.js + Express backend
    ├── src/
    │   ├── controllers/  # Route controllers
    │   ├── models/       # Database models
    │   ├── routes/       # API routes
    │   ├── services/     # Business logic
    │   │   ├── MonsterService.ts  # Monster CRUD operations
    │   │   └── BreedingService.ts # Breeding mechanics
    │   └── utils/        # Utility functions
    └── package.json
```

## Tech Stack

### Frontend
- React.js with TypeScript
- Three.js for 3D graphics
- GSAP for animations
- Redux for state management
- Tailwind CSS for styling
- Framer Motion for UI animations

### Backend
- Node.js with Express
- MongoDB for database
- JWT for authentication
- Socket.io for real-time features

## Features

### Monster System
- Monster collection and management
- Detailed monster viewing with stats and genetic information
- Monster grid with filtering and sorting
- Genetic stability tracking
- Generation tracking

### Breeding System
- Advanced breeding mechanics with genetic inheritance
- Parent compatibility checking
- Genetic stability calculation
- Mutation rate system
- Offspring generation with:
  - Inherited stats with random variation
  - Combined abilities
  - Genetic traits (dominant/recessive genes)
  - Type inheritance
  - Name generation

### Battle System
- Turn-based combat
- Stat-based damage calculation
- Health tracking
- Battle status and results
- Visual feedback

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB
- pnpm (v8 or higher)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/yougene.git
cd yougene
```

2. Install frontend dependencies:
```bash
cd frontend
pnpm install
```

3. Install backend dependencies:
```bash
cd ../backend
pnpm install
```

4. Set up environment variables:
```bash
# In backend directory
cp .env.example .env
# Edit .env with your configuration
```

5. Start the development servers:
```bash
# Start backend (from backend directory)
pnpm dev

# Start frontend (from frontend directory)
pnpm dev
```

## Development Roadmap

### Phase 1: Basic YouGene System ✅
- Core game loop implementation
- 30 starter monsters with basic genetics
- Simple YouGene breeding mechanics
- One exploration zone
- Basic battle system

### Phase 2: Genetic Expansion
- Additional 50 monsters
- Enhanced breeding with mutations
- 3 more exploration zones
- Advanced battle mechanics
- Basic social features

### Phase 3: Full Gene-sis
- Complete monster collection (120+ creatures)
- Advanced YouGene fusion system
- All exploration zones
- Tournament system
- Cross-player breeding marketplace

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

⚠️ **IMPORTANT NOTICE** ⚠️

While this repository is publicly visible, it is NOT open source. This software is released under a proprietary "Source Available" license.

Copyright © 2025 YouGene. All rights reserved.

**Permitted Uses:**
- Viewing source code for educational purposes
- Cloning for personal, non-commercial development and testing
- Submitting issues and pull requests

**Prohibited Uses:**
- Commercial use without a license
- Distribution or sharing
- Creating derivative works
- Using trademarks or branding

For full license terms, see the [LICENSE](LICENSE) file.

For commercial licensing inquiries, please contact: avilaeugeneb@gmail.com

## Acknowledgments

- Inspired by monster collection and breeding games
- Special thanks to all contributors and supporters

For detailed theme and styling documentation, please refer to [frontend/THEME.md](frontend/THEME.md)
