# YouGene Frontend

The frontend application for YouGene, built with React, TypeScript, and Tailwind CSS.

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
- [x] Navigation component with mobile responsiveness
- [ ] Layout components (Container, Card, Grid)
- [ ] Loading and error states
- [ ] Toast notification system

### 2. Authentication & User Profile
- [x] Login page with form validation
- [x] Registration flow
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
   - [x] Add mobile menu functionality to Navigation.tsx
   - [x] Implement user dropdown in nav
   - [x] Create layout wrapper component
   - [ ] Add breadcrumb navigation

2. **Authentication**
   - [x] Create AuthContext
   - [x] Design login page
   - [x] Implement registration flow
   - [x] Add protected routes

3. **Monster System**
   - [ ] Create MonsterCard component
   - [ ] Implement MonsterGrid layout
   - [ ] Add monster filtering system
   - [ ] Create monster detail view

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- pnpm (v8 or higher)

### Installation

1. Install dependencies:
```bash
pnpm install
```

2. Start the development server:
```bash
pnpm dev
```

## Project Structure

```
frontend/
├── src/
│   ├── components/     # Reusable UI components
│   ├── contexts/       # React contexts
│   ├── hooks/         # Custom React hooks
│   ├── layouts/       # Layout components
│   ├── pages/         # Page components
│   ├── services/      # API services
│   ├── styles/        # Global styles
│   ├── types/         # TypeScript types
│   ├── utils/         # Utility functions
│   ├── App.tsx        # Root component
│   └── main.tsx       # Entry point
├── public/            # Static assets
├── index.html         # HTML template
├── package.json       # Dependencies
├── tailwind.config.js # Tailwind configuration
└── vite.config.ts     # Vite configuration
```

## Features

### Authentication
- JWT-based authentication
- Protected routes
- Persistent login state
- Form validation
- Error handling

### Navigation
- Responsive navigation bar
- Mobile-friendly menu
- User dropdown
- Protected route handling

### UI Components
- Reusable card components
- Loading states
- Error boundaries
- Toast notifications
- Form components

## Contributing

1. Create your feature branch (`git checkout -b feature/AmazingFeature`)
2. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
3. Push to the branch (`git push origin feature/AmazingFeature`)
4. Open a Pull Request

## License

This project is proprietary software. See the main project README for license details. 