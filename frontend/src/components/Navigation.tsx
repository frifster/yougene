import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navigation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const renderAuthLinks = () => {
    if (isAuthenticated) {
      return (
        <button
          onClick={handleLogout}
          className="px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 select-none text-text/80 hover:text-text hover:bg-white/5"
        >
          Logout
        </button>
      );
    }

    return (
      <>
        <Link
          to="/login"
          className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 select-none ${
            isActive('/login')
              ? 'bg-primary/20 text-primary'
              : 'text-text/80 hover:text-text hover:bg-white/5'
          }`}
        >
          Login
        </Link>
        <Link
          to="/register"
          className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 select-none ${
            isActive('/register')
              ? 'bg-primary/20 text-primary'
              : 'text-text/80 hover:text-text hover:bg-white/5'
          }`}
        >
          Register
        </Link>
      </>
    );
  };

  const renderGameLinks = () => {
    if (!isAuthenticated) return null;

    return (
      <>
        <Link
          to="/game-hub"
          className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 select-none ${
            isActive('/game-hub')
              ? 'bg-primary/20 text-primary'
              : 'text-text/80 hover:text-text hover:bg-white/5'
          }`}
        >
          Lab
        </Link>
        <Link
          to="/profile"
          className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 select-none ${
            isActive('/profile')
              ? 'bg-primary/20 text-primary'
              : 'text-text/80 hover:text-text hover:bg-white/5'
          }`}
        >
          Profile
        </Link>
        <Link
          to="/collection"
          className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 select-none ${
            isActive('/collection')
              ? 'bg-primary/20 text-primary'
              : 'text-text/80 hover:text-text hover:bg-white/5'
          }`}
        >
          Collection
        </Link>
        <Link
          to="/battle"
          className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 select-none ${
            isActive('/battle')
              ? 'bg-primary/20 text-primary'
              : 'text-text/80 hover:text-text hover:bg-white/5'
          }`}
        >
          Battle
        </Link>
      </>
    );
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center select-none">
            <span className="text-xl font-bold gradient-text">YouGene</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              {renderGameLinks()}
              {renderAuthLinks()}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-lg text-text/80 hover:text-text hover:bg-white/5 focus:outline-none select-none"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'opacity-100 max-h-96' : 'opacity-0 max-h-0 overflow-hidden'
        }`}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-background/95 backdrop-blur-sm">
          {renderGameLinks()}
          {renderAuthLinks()}
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 