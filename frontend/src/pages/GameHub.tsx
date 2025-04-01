import React from 'react';
import { Link } from 'react-router-dom';

const GameHub: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-text p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">YouGene Lab</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Exploration Map */}
          <Link
            to="/explore"
            className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors"
          >
            <h2 className="text-2xl font-semibold mb-2">Exploration Map</h2>
            <p className="text-gray-400">
              Discover new monsters in various biomes
            </p>
          </Link>

          {/* Monster Collection */}
          <Link
            to="/collection"
            className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors"
          >
            <h2 className="text-2xl font-semibold mb-2">Monster Collection</h2>
            <p className="text-gray-400">
              View and manage your monster collection
            </p>
          </Link>

          {/* Fusion Lab */}
          <Link
            to="/fusion"
            className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors"
          >
            <h2 className="text-2xl font-semibold mb-2">Fusion Lab</h2>
            <p className="text-gray-400">
              Create new monsters through genetic fusion
            </p>
          </Link>

          {/* Battle Arena */}
          <Link
            to="/battle"
            className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors"
          >
            <h2 className="text-2xl font-semibold mb-2">Battle Arena</h2>
            <p className="text-gray-400">
              Test your monsters in battle
            </p>
          </Link>

          {/* Gene Market */}
          <Link
            to="/market"
            className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors"
          >
            <h2 className="text-2xl font-semibold mb-2">Gene Market</h2>
            <p className="text-gray-400">
              Trade monsters and genetic materials
            </p>
          </Link>

          {/* Researcher Profile */}
          <Link
            to="/profile"
            className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors"
          >
            <h2 className="text-2xl font-semibold mb-2">Researcher Profile</h2>
            <p className="text-gray-400">
              View your stats and achievements
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GameHub; 