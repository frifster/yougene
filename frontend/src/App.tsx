import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import Navigation from './components/Navigation';
import { GlobalProgressBar } from './components/ui/GlobalProgressBar';
import { AuthProvider } from './contexts/AuthContext';
import { ProgressProvider } from './contexts/ProgressContext';

// Lazy load pages for better performance
const LandingPage = React.lazy(() => import('./pages/LandingPage'));
const GameHub = React.lazy(() => import('./pages/GameHub'));
const ExplorationMap = React.lazy(() => import('./pages/ExplorationMap'));
const MonsterCollection = React.lazy(() => import('./pages/MonsterCollection'));
const FusionLab = React.lazy(() => import('./pages/FusionLab'));
const BattleArena = React.lazy(() => import('./pages/BattleArena'));
const GeneMarket = React.lazy(() => import('./pages/GeneMarket'));
const ResearcherProfile = React.lazy(() => import('./pages/ResearcherProfile'));
const LoginPage = React.lazy(() => import('./pages/auth/LoginPage'));
const RegisterPage = React.lazy(() => import('./pages/auth/RegisterPage'));

function App() {
  return (
    <AuthProvider>
      <ProgressProvider>
        <div className="min-h-screen bg-background">
          <GlobalProgressBar />
          <Navigation />
          <Suspense
            fallback={
              <div className="flex items-center justify-center min-h-screen">
                <div className="text-text/80">Loading...</div>
              </div>
            }
          >
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              {/* Protected routes */}
              <Route
                path="/game-hub"
                element={
                  <ProtectedRoute>
                    <GameHub />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/explore"
                element={
                  <ProtectedRoute>
                    <ExplorationMap />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/collection"
                element={
                  <ProtectedRoute>
                    <MonsterCollection />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/fusion"
                element={
                  <ProtectedRoute>
                    <FusionLab />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/battle"
                element={
                  <ProtectedRoute>
                    <BattleArena />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/market"
                element={
                  <ProtectedRoute>
                    <GeneMarket />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ResearcherProfile />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Suspense>
        </div>
      </ProgressProvider>
    </AuthProvider>
  );
}

export default App;
