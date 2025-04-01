import React from 'react';
import { useNavigate } from 'react-router-dom';

const GameHub: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-text pt-24 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8">YouGene Lab</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Exploration Map */}
          <button
            onClick={() => navigate('/explore')}
            className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors text-left w-full"
          >
            <h2 className="text-2xl font-semibold mb-2">Exploration Map</h2>
            <p className="text-gray-400">Discover new monsters in various biomes</p>
          </button>

          {/* Monster Collection */}
          <button
            onClick={() => navigate('/collection')}
            className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors text-left w-full"
          >
            <h2 className="text-2xl font-semibold mb-2">Monster Collection</h2>
            <p className="text-gray-400">View and manage your monster collection</p>
          </button>

          {/* Fusion Lab */}
          <button
            onClick={() => navigate('/fusion')}
            className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors text-left w-full"
          >
            <h2 className="text-2xl font-semibold mb-2">Fusion Lab</h2>
            <p className="text-gray-400">Create new monsters through genetic fusion</p>
          </button>

          {/* Battle Arena */}
          <button
            onClick={() => navigate('/battle')}
            className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors text-left w-full"
          >
            <h2 className="text-2xl font-semibold mb-2">Battle Arena</h2>
            <p className="text-gray-400">Test your monsters in battle</p>
          </button>

          {/* Gene Market */}
          <button
            onClick={() => navigate('/market')}
            className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors text-left w-full"
          >
            <h2 className="text-2xl font-semibold mb-2">Gene Market</h2>
            <p className="text-gray-400">Trade monsters and genetic materials</p>
          </button>

          {/* Researcher Profile */}
          <button
            onClick={() => navigate('/profile')}
            className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors text-left w-full"
          >
            <h2 className="text-2xl font-semibold mb-2">Researcher Profile</h2>
            <p className="text-gray-400">View your stats and achievements</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameHub;
