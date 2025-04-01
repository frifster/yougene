# YouGene: Monster Fusion Frontier

A web-based monster collection, breeding, and battle game featuring interactive 3D graphics. Players explore various biomes to catch wild monsters, then use the revolutionary "You-Gene Technology" to breed and fuse them into powerful new creatures.

## Project Structure

```
yougene/
├── frontend/           # React + TypeScript frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/        # Page components
│   │   ├── assets/       # Static assets (images, models)
│   │   ├── utils/        # Utility functions
│   │   ├── store/        # Redux store configuration
│   │   └── types/        # TypeScript type definitions
│   └── package.json
│
└── backend/           # Node.js + Express backend
    ├── src/
    │   ├── controllers/  # Route controllers
    │   ├── models/       # Database models
    │   ├── routes/       # API routes
    │   ├── services/     # Business logic
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

### Backend
- Node.js with Express
- MongoDB for database
- JWT for authentication
- Socket.io for real-time features

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

### Phase 1: Basic You-Gene System
- Core game loop implementation
- 30 starter monsters with basic genetics
- Simple You-Gene breeding mechanics
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
- Advanced You-Gene fusion system
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

Copyright © 2025 You-Gene. All rights reserved.

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
