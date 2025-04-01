import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-background text-text flex items-center justify-center">
      {/* Background Pattern */}
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-primary bg-opacity-5" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-secondary via-background to-background opacity-10" />
      </div>
      
      {/* DNA Helix Animation */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[800px] h-[800px] -top-1/4 -right-1/4 animate-dna-spin opacity-20">
          <div className="absolute inset-0 border border-primary border-opacity-20 rounded-full" />
          <div className="absolute inset-[100px] border border-secondary border-opacity-20 rounded-full" />
          <div className="absolute inset-[200px] border border-accent border-opacity-20 rounded-full" />
        </div>
        <div className="absolute w-[600px] h-[600px] -bottom-1/4 -left-1/4 animate-dna-spin opacity-20">
          <div className="absolute inset-0 border border-primary border-opacity-20 rounded-full" />
          <div className="absolute inset-[75px] border border-secondary border-opacity-20 rounded-full" />
          <div className="absolute inset-[150px] border border-accent border-opacity-20 rounded-full" />
        </div>
      </div>

      {/* Main Content Container */}
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col items-center justify-center space-y-16">
          {/* Title Section */}
          <div className="w-full text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold gradient-text inline-block">
                You-Gene
              </h1>
              <h2 className="text-xl sm:text-2xl lg:text-3xl text-gray-300 font-light tracking-wider">
                Monster Fusion Frontier
              </h2>
            </div>
            <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
              Embark on a journey of genetic discovery. Collect, fuse, and battle unique monsters in this innovative game of genetic engineering.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="w-full max-w-lg mx-auto">
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/hub"
                className="flex-1 px-8 py-4 bg-primary bg-opacity-90 hover:bg-opacity-100 text-white rounded-xl transition-all duration-300 text-center"
              >
                <span className="text-lg font-semibold">Enter Lab</span>
              </Link>
              <Link
                to="/profile"
                className="flex-1 px-8 py-4 glass text-white rounded-xl transition-all duration-300 text-center"
              >
                <span className="text-lg font-semibold">Researcher Profile</span>
              </Link>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass rounded-xl p-8 flex flex-col items-center text-center">
              <div className="text-4xl mb-4">🧬</div>
              <h3 className="text-xl font-semibold mb-3 text-primary">Genetic Fusion</h3>
              <p className="text-gray-300">Create unique monsters by combining genetic traits in our state-of-the-art laboratory</p>
            </div>
            <div className="glass rounded-xl p-8 flex flex-col items-center text-center">
              <div className="text-4xl mb-4">⚔️</div>
              <h3 className="text-xl font-semibold mb-3 text-secondary">Strategic Battles</h3>
              <p className="text-gray-300">Test your creations in tactical battles against other researchers</p>
            </div>
            <div className="glass rounded-xl p-8 flex flex-col items-center text-center">
              <div className="text-4xl mb-4">🌍</div>
              <h3 className="text-xl font-semibold mb-3 text-accent">World Exploration</h3>
              <p className="text-gray-300">Discover new species across diverse biomes and expand your collection</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage; 