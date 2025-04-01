import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold gradient-text">You-Gene</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              <Link
                to="/hub"
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  isActive('/hub')
                    ? 'bg-primary/20 text-primary'
                    : 'text-text/80 hover:text-text hover:bg-white/5'
                }`}
              >
                Lab
              </Link>
              <Link
                to="/profile"
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  isActive('/profile')
                    ? 'bg-primary/20 text-primary'
                    : 'text-text/80 hover:text-text hover:bg-white/5'
                }`}
              >
                Profile
              </Link>
              <Link
                to="/collection"
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  isActive('/collection')
                    ? 'bg-primary/20 text-primary'
                    : 'text-text/80 hover:text-text hover:bg-white/5'
                }`}
              >
                Collection
              </Link>
              <Link
                to="/battle"
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  isActive('/battle')
                    ? 'bg-primary/20 text-primary'
                    : 'text-text/80 hover:text-text hover:bg-white/5'
                }`}
              >
                Battle
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-lg text-text/80 hover:text-text hover:bg-white/5 focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="block h-6 w-6"
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
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="md:hidden hidden" id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            to="/hub"
            className={`block px-3 py-2 rounded-lg text-base font-medium ${
              isActive('/hub')
                ? 'bg-primary/20 text-primary'
                : 'text-text/80 hover:text-text hover:bg-white/5'
            }`}
          >
            Lab
          </Link>
          <Link
            to="/profile"
            className={`block px-3 py-2 rounded-lg text-base font-medium ${
              isActive('/profile')
                ? 'bg-primary/20 text-primary'
                : 'text-text/80 hover:text-text hover:bg-white/5'
            }`}
          >
            Profile
          </Link>
          <Link
            to="/collection"
            className={`block px-3 py-2 rounded-lg text-base font-medium ${
              isActive('/collection')
                ? 'bg-primary/20 text-primary'
                : 'text-text/80 hover:text-text hover:bg-white/5'
            }`}
          >
            Collection
          </Link>
          <Link
            to="/battle"
            className={`block px-3 py-2 rounded-lg text-base font-medium ${
              isActive('/battle')
                ? 'bg-primary/20 text-primary'
                : 'text-text/80 hover:text-text hover:bg-white/5'
            }`}
          >
            Battle
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 