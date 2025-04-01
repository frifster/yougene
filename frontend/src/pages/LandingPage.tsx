import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Container, Grid } from '../components/layout';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-background text-text flex items-center justify-center relative">
      {/* Background Pattern */}
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />
      </div>

      {/* DNA Helix Animation - Reduced opacity */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[800px] h-[800px] -top-1/4 -right-1/4 animate-dna-spin opacity-5">
          <div className="absolute inset-0 border-2 border-primary/30 rounded-full" />
          <div className="absolute inset-[100px] border-2 border-secondary/30 rounded-full" />
          <div className="absolute inset-[200px] border-2 border-accent/30 rounded-full" />
        </div>
        <div className="absolute w-[600px] h-[600px] -bottom-1/4 -left-1/4 animate-dna-spin opacity-5">
          <div className="absolute inset-0 border-2 border-primary/30 rounded-full" />
          <div className="absolute inset-[75px] border-2 border-secondary/30 rounded-full" />
          <div className="absolute inset-[150px] border-2 border-accent/30 rounded-full" />
        </div>
      </div>

      {/* Main Content Container */}
      <Container>
        <div className="flex flex-col items-center justify-center space-y-16">
          {/* Title Section */}
          <div className="w-full text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold text-white drop-shadow-lg">
                YouGene
              </h1>
              <h2 className="text-xl sm:text-2xl lg:text-3xl text-white font-light tracking-wider drop-shadow-md">
                Monster Fusion Frontier
              </h2>
            </div>
            <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto drop-shadow">
              Embark on a journey of genetic discovery. Collect, fuse, and battle unique monsters in
              this innovative game of genetic engineering.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="w-full max-w-lg mx-auto">
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => navigate('/game-hub')}
                className="flex-1 px-8 py-4 bg-white text-primary font-semibold rounded-xl transition-all duration-300 text-center shadow-xl hover:shadow-white/20 hover:bg-white/90"
              >
                <span className="text-lg">Enter Lab</span>
              </button>
              <button
                onClick={() => navigate('/profile')}
                className="flex-1 px-8 py-4 bg-white/10 backdrop-blur-lg text-white font-semibold rounded-xl transition-all duration-300 text-center shadow-xl hover:bg-white/20"
              >
                <span className="text-lg">Researcher Profile</span>
              </button>
            </div>
          </div>

          {/* Feature Cards */}
          <Grid cols={3} gap="md">
            <Card className="bg-white/10 backdrop-blur-lg flex flex-col items-center text-center hover:bg-white/20 transition-all duration-300">
              <div className="text-4xl mb-4">🧬</div>
              <h3 className="text-xl font-semibold mb-3 text-white">Genetic Fusion</h3>
              <p className="text-white/90">
                Create unique monsters by combining genetic traits in our state-of-the-art
                laboratory
              </p>
            </Card>
            <Card className="bg-white/10 backdrop-blur-lg flex flex-col items-center text-center hover:bg-white/20 transition-all duration-300">
              <div className="text-4xl mb-4">⚔️</div>
              <h3 className="text-xl font-semibold mb-3 text-white">Strategic Battles</h3>
              <p className="text-white/90">
                Test your creations in tactical battles against other researchers
              </p>
            </Card>
            <Card className="bg-white/10 backdrop-blur-lg flex flex-col items-center text-center hover:bg-white/20 transition-all duration-300">
              <div className="text-4xl mb-4">🌍</div>
              <h3 className="text-xl font-semibold mb-3 text-white">World Exploration</h3>
              <p className="text-white/90">
                Discover new species across diverse biomes and expand your collection
              </p>
            </Card>
          </Grid>
        </div>
      </Container>
    </div>
  );
};

export default LandingPage;
