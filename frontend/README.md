# You-Gene Frontend

The frontend application for You-Gene, built with React, TypeScript, and Tailwind CSS.

## Tech Stack

- React 18+ with TypeScript
- Tailwind CSS for styling
- Three.js for 3D monster rendering
- GSAP for animations
- Redux Toolkit for state management
- React Router for navigation
- Vite for build tooling

## Development Plan

### 1. Core UI Framework (Current Phase)
- [x] Project setup with Vite and TypeScript
- [x] Tailwind CSS configuration
- [x] Basic routing setup
- [x] Theme system implementation
- [ ] Navigation component with mobile responsiveness
- [ ] Layout components (Container, Card, Grid)
- [ ] Loading and error states
- [ ] Toast notification system

### 2. Authentication & User Profile
- [ ] Login page with form validation
- [ ] Registration flow
- [ ] Password recovery
- [ ] Researcher profile page
- [ ] Profile editing
- [ ] Achievement system UI
- [ ] Settings page

### 3. Monster Laboratory
- [ ] Monster card component
- [ ] Monster detail view
- [ ] 3D monster viewer
- [ ] Monster stats display
- [ ] Gene visualization system
- [ ] Breeding interface
- [ ] Fusion laboratory UI
- [ ] Results preview

### 4. Battle System
- [ ] Battle arena layout
- [ ] Monster selection interface
- [ ] Battle animation system
- [ ] Real-time battle updates
- [ ] Battle results screen
- [ ] Leaderboard
- [ ] Tournament brackets UI

### 5. Collection & Management
- [ ] Monster collection grid
- [ ] Filtering and sorting system
- [ ] Monster comparison tool
- [ ] Gene library interface
- [ ] Evolution tree visualization
- [ ] Collection statistics
- [ ] Trading interface

### 6. World Exploration
- [ ] World map interface
- [ ] Biome selection
- [ ] Exploration minigame
- [ ] Discovery animations
- [ ] Reward system UI
- [ ] Progress tracking

### 7. Social Features
- [ ] Friends list
- [ ] Chat system
- [ ] Trading marketplace
- [ ] Community events UI
- [ ] Guild system interface

### 8. Polish & Optimization
- [ ] Performance optimization
- [ ] Loading state improvements
- [ ] Animation refinements
- [ ] Accessibility audit
- [ ] Mobile responsiveness
- [ ] Browser compatibility
- [ ] Error boundary implementation

## Immediate TODOs

1. **Navigation & Layout**
   - [ ] Add mobile menu functionality to Navigation.tsx
   - [ ] Implement user dropdown in nav
   - [ ] Create layout wrapper component
   - [ ] Add breadcrumb navigation

2. **Authentication**
   - [ ] Create AuthContext
   - [ ] Design login page
   - [ ] Implement registration flow
   - [ ] Add protected routes

3. **Monster System**
   - [ ] Design monster card component
   - [ ] Create monster detail page
   - [ ] Implement 3D viewer
   - [ ] Add monster stats display

4. **State Management**
   - [ ] Set up Redux store
   - [ ] Create user slice
   - [ ] Create monster slice
   - [ ] Add API middleware

## Getting Started

1. Install dependencies:
```bash
pnpm install
```

2. Start development server:
```bash
pnpm dev
```

3. Build for production:
```bash
pnpm build
```

## Project Structure
```
src/
├── components/       # Reusable UI components
├── pages/           # Page components
├── features/        # Feature-specific components and logic
├── store/           # Redux store configuration
├── hooks/           # Custom React hooks
├── utils/           # Utility functions
├── types/           # TypeScript types and interfaces
├── assets/          # Static assets
└── styles/          # Global styles and Tailwind config
```

## Contributing

Please refer to the main project README for contribution guidelines.

## Documentation

- [Theme Documentation](./THEME.md) - Detailed theme and styling guidelines
- [Component Documentation](./docs/COMPONENTS.md) - Component API documentation
- [State Management](./docs/STATE.md) - Redux store structure and usage 