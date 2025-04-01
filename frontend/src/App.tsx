import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';

// Lazy load pages for better performance
const LandingPage = React.lazy(() => import('./pages/LandingPage'));
const GameHub = React.lazy(() => import('./pages/GameHub'));
const ExplorationMap = React.lazy(() => import('./pages/ExplorationMap'));
const MonsterCollection = React.lazy(() => import('./pages/MonsterCollection'));
const FusionLab = React.lazy(() => import('./pages/FusionLab'));
const BattleArena = React.lazy(() => import('./pages/BattleArena'));
const GeneMarket = React.lazy(() => import('./pages/GeneMarket'));
const ResearcherProfile = React.lazy(() => import('./pages/ResearcherProfile'));

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-text/80">Loading...</div>
        </div>
      }>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/hub" element={<GameHub />} />
          <Route path="/explore" element={<ExplorationMap />} />
          <Route path="/collection" element={<MonsterCollection />} />
          <Route path="/fusion" element={<FusionLab />} />
          <Route path="/battle" element={<BattleArena />} />
          <Route path="/market" element={<GeneMarket />} />
          <Route path="/profile" element={<ResearcherProfile />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App; 