import React from 'react';

interface Biome {
  id: string;
  name: string;
  description: string;
  monsterTypes: string[];
  unlocked: boolean;
  imageUrl: string;
}

const biomes: Biome[] = [
  {
    id: 'forest',
    name: 'Gene Forest',
    description: 'A lush forest teeming with nature-based monsters',
    monsterTypes: ['Flora', 'Terra', 'Aero'],
    unlocked: true,
    imageUrl: '/biomes/forest.jpg'
  },
  {
    id: 'volcano',
    name: 'Pyro Peaks',
    description: 'Volcanic region home to fire-type monsters',
    monsterTypes: ['Pyro', 'Terra'],
    unlocked: false,
    imageUrl: '/biomes/volcano.jpg'
  },
  {
    id: 'ocean',
    name: 'Hydro Haven',
    description: 'Deep ocean waters with aquatic monsters',
    monsterTypes: ['Hydro', 'Cryo'],
    unlocked: false,
    imageUrl: '/biomes/ocean.jpg'
  },
  {
    id: 'crystal',
    name: 'Crystal Caverns',
    description: 'Underground caves with crystalline monsters',
    monsterTypes: ['Lumina', 'Terra'],
    unlocked: false,
    imageUrl: '/biomes/crystal.jpg'
  }
];

const ExplorationMap: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-text p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Exploration Map</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {biomes.map((biome) => (
            <div
              key={biome.id}
              className={`relative rounded-lg overflow-hidden ${
                biome.unlocked ? 'cursor-pointer hover:opacity-90' : 'opacity-50'
              }`}
            >
              <div className="aspect-video bg-gray-800 relative">
                {/* Placeholder for biome image */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h2 className="text-2xl font-semibold mb-2">{biome.name}</h2>
                  <p className="text-gray-300 mb-2">{biome.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {biome.monsterTypes.map((type) => (
                      <span
                        key={type}
                        className="px-2 py-1 bg-primary/20 rounded text-sm"
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              {!biome.unlocked && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <span className="text-xl font-semibold">Locked</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExplorationMap; 