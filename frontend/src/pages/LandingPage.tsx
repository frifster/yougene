import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-text relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
      
      {/* DNA Animation */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full animate-dna-spin">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96">
            <div className="absolute inset-0 border-2 border-primary/30 rounded-full animate-pulse" />
            <div className="absolute inset-8 border-2 border-secondary/30 rounded-full animate-pulse delay-75" />
            <div className="absolute inset-16 border-2 border-accent/30 rounded-full animate-pulse delay-150" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-8">
        <div className="text-center space-y-8">
          {/* Title */}
          <div className="space-y-4">
            <h1 className="text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent animate-gene-pulse">
              You-Gene
            </h1>
            <h2 className="text-3xl text-gray-400 font-light tracking-wide">
              Monster Fusion Frontier
            </h2>
          </div>

          {/* Description */}
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Embark on a journey of genetic discovery. Collect, fuse, and battle unique monsters in this innovative game of genetic engineering.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link
              to="/hub"
              className="group relative px-8 py-4 bg-primary hover:bg-primary/90 text-white rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-primary/30"
            >
              <span className="relative z-10 text-lg font-semibold">Enter Lab</span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
            <Link
              to="/profile"
              className="group relative px-8 py-4 bg-secondary hover:bg-secondary/90 text-white rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-secondary/30"
            >
              <span className="relative z-10 text-lg font-semibold">Researcher Profile</span>
              <div className="absolute inset-0 bg-gradient-to-r from-secondary to-accent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
          </div>

          {/* Feature Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700/50">
              <div className="text-2xl mb-4">🧬</div>
              <h3 className="text-xl font-semibold mb-2">Genetic Fusion</h3>
              <p className="text-gray-400">Create unique monsters by combining genetic traits</p>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700/50">
              <div className="text-2xl mb-4">⚔️</div>
              <h3 className="text-xl font-semibold mb-2">Strategic Battles</h3>
              <p className="text-gray-400">Test your creations in tactical battles</p>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700/50">
              <div className="text-2xl mb-4">🌍</div>
              <h3 className="text-xl font-semibold mb-2">World Exploration</h3>
              <p className="text-gray-400">Discover new species in diverse biomes</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage; 