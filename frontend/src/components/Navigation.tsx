import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/hooks/useAuth';
import { useProgress } from '../contexts/hooks/useProgress';

const Navigation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const { setIsLoading } = useProgress();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleMobileMenu();
    }
  };

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await logout();
      navigate('/login');
    } finally {
      setIsLoading(false);
    }
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
        <button
          onClick={() => navigate('/login')}
          className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 select-none ${
            isActive('/login')
              ? 'bg-primary/20 text-primary'
              : 'text-text/80 hover:text-text hover:bg-white/5'
          }`}
        >
          Login
        </button>
        <button
          onClick={() => navigate('/register')}
          className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 select-none ${
            isActive('/register')
              ? 'bg-primary/20 text-primary'
              : 'text-text/80 hover:text-text hover:bg-white/5'
          }`}
        >
          Register
        </button>
      </>
    );
  };

  const renderGameLinks = () => {
    if (!isAuthenticated) return null;

    return (
      <>
        <button
          onClick={() => navigate('/game-hub')}
          className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 select-none ${
            isActive('/game-hub')
              ? 'bg-primary/20 text-primary'
              : 'text-text/80 hover:text-text hover:bg-white/5'
          }`}
        >
          Lab
        </button>
        <button
          onClick={() => navigate('/profile')}
          className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 select-none ${
            isActive('/profile')
              ? 'bg-primary/20 text-primary'
              : 'text-text/80 hover:text-text hover:bg-white/5'
          }`}
        >
          Profile
        </button>
        <button
          onClick={() => navigate('/collection')}
          className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 select-none ${
            isActive('/collection')
              ? 'bg-primary/20 text-primary'
              : 'text-text/80 hover:text-text hover:bg-white/5'
          }`}
        >
          Collection
        </button>
        <button
          onClick={() => navigate('/battle')}
          className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 select-none ${
            isActive('/battle')
              ? 'bg-primary/20 text-primary'
              : 'text-text/80 hover:text-text hover:bg-white/5'
          }`}
        >
          Battle
        </button>
      </>
    );
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => navigate('/')}
            className="flex items-center select-none"
          >
            <span className="text-xl font-bold gradient-text">YouGene</span>
          </button>

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
              onKeyDown={handleKeyPress}
              className="inline-flex items-center justify-center p-2 rounded-lg text-text/80 hover:text-text hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-primary/50 select-none"
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
        ref={mobileMenuRef}
        className={`md:hidden transition-all duration-300 ease-in-out transform ${
          isMobileMenuOpen
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 -translate-y-2 pointer-events-none'
        }`}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-background/95 backdrop-blur-sm border-t border-white/10">
          {renderGameLinks()}
          {renderAuthLinks()}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
