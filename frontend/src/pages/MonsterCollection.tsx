import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

interface Monster {
  id: string;
  name: string;
  type: string;
  level: number;
  geneticStability: number;
  abilities: string[];
  stats: {
    vitality: number;
    strength: number;
    defense: number;
    agility: number;
    intelligence: number;
  };
}

const MonsterCollection: React.FC = () => {
  // This will be replaced with actual Redux state once we implement it
  const monsters: Monster[] = [
    {
      id: '1',
      name: 'Flora Sprout',
      type: 'Flora',
      level: 5,
      geneticStability: 85,
      abilities: ['Growth', 'Photosynthesis', 'Vine Whip'],
      stats: {
        vitality: 70,
        strength: 45,
        defense: 60,
        agility: 55,
        intelligence: 50
      }
    },
    {
      id: '2',
      name: 'Pyro Drake',
      type: 'Pyro',
      level: 8,
      geneticStability: 92,
      abilities: ['Flame Burst', 'Heat Wave', 'Ember'],
      stats: {
        vitality: 65,
        strength: 75,
        defense: 50,
        agility: 70,
        intelligence: 60
      }
    }
  ];

  return (
    <div className="min-h-screen bg-background text-text p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Monster Collection</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {monsters.map((monster) => (
            <div
              key={monster.id}
              className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors"
            >
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-semibold">{monster.name}</h2>
                <span className="px-2 py-1 bg-primary/20 rounded text-sm">
                  {monster.type}
                </span>
              </div>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>Level:</span>
                  <span>{monster.level}</span>
                </div>
                <div className="flex justify-between">
                  <span>Genetic Stability:</span>
                  <span>{monster.geneticStability}%</span>
                </div>
              </div>
              <div className="mb-4">
                <h3 className="font-semibold mb-2">Abilities:</h3>
                <div className="flex flex-wrap gap-2">
                  {monster.abilities.map((ability) => (
                    <span
                      key={ability}
                      className="px-2 py-1 bg-secondary/20 rounded text-sm"
                    >
                      {ability}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Stats:</h3>
                <div className="space-y-1">
                  {Object.entries(monster.stats).map(([stat, value]) => (
                    <div key={stat} className="flex justify-between">
                      <span className="capitalize">{stat}:</span>
                      <span>{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MonsterCollection; 