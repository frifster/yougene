import React, { useState } from 'react';
import { Card, Container } from '../components/layout';

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

const FusionLab: React.FC = () => {
  const [selectedParent1, setSelectedParent1] = useState<Monster | null>(null);
  const [selectedParent2, setSelectedParent2] = useState<Monster | null>(null);
  const [compatibility, setCompatibility] = useState<number>(0);

  // This will be replaced with actual Redux state
  const availableMonsters: Monster[] = [
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
        intelligence: 50,
      },
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
        intelligence: 60,
      },
    },
  ];

  const calculateCompatibility = (monster1: Monster, monster2: Monster) => {
    // Simple compatibility calculation based on genetic stability
    const avgStability = (monster1.geneticStability + monster2.geneticStability) / 2;
    return Math.round(avgStability);
  };

  const handleParentSelect = (monster: Monster, parentNumber: 1 | 2) => {
    if (parentNumber === 1) {
      setSelectedParent1(monster);
      if (selectedParent2) {
        setCompatibility(calculateCompatibility(monster, selectedParent2));
      }
    } else {
      setSelectedParent2(monster);
      if (selectedParent1) {
        setCompatibility(calculateCompatibility(selectedParent1, monster));
      }
    }
  };

  return (
    <Container>
      <h1 className="text-4xl font-bold mb-8">Fusion Lab</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Parent 1 Selection */}
        <Card>
          <h2 className="text-2xl font-semibold mb-4">Parent 1</h2>
          {selectedParent1 ? (
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <h3 className="text-xl">{selectedParent1.name}</h3>
                <span className="px-2 py-1 bg-primary/20 rounded text-sm">
                  {selectedParent1.type}
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Level:</span>
                  <span>{selectedParent1.level}</span>
                </div>
                <div className="flex justify-between">
                  <span>Genetic Stability:</span>
                  <span>{selectedParent1.geneticStability}%</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedParent1(null)}
                className="text-red-400 hover:text-red-300"
              >
                Clear Selection
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <h3 className="text-lg mb-2">Select a monster:</h3>
              <div className="grid grid-cols-2 gap-4">
                {availableMonsters.map(monster => (
                  <button
                    key={monster.id}
                    onClick={() => handleParentSelect(monster, 1)}
                    className="p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors text-left"
                  >
                    <div className="font-semibold">{monster.name}</div>
                    <div className="text-sm text-gray-400">{monster.type}</div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </Card>

        {/* Parent 2 Selection */}
        <Card>
          <h2 className="text-2xl font-semibold mb-4">Parent 2</h2>
          {selectedParent2 ? (
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <h3 className="text-xl">{selectedParent2.name}</h3>
                <span className="px-2 py-1 bg-primary/20 rounded text-sm">
                  {selectedParent2.type}
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Level:</span>
                  <span>{selectedParent2.level}</span>
                </div>
                <div className="flex justify-between">
                  <span>Genetic Stability:</span>
                  <span>{selectedParent2.geneticStability}%</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedParent2(null)}
                className="text-red-400 hover:text-red-300"
              >
                Clear Selection
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <h3 className="text-lg mb-2">Select a monster:</h3>
              <div className="grid grid-cols-2 gap-4">
                {availableMonsters.map(monster => (
                  <button
                    key={monster.id}
                    onClick={() => handleParentSelect(monster, 2)}
                    className="p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors text-left"
                  >
                    <div className="font-semibold">{monster.name}</div>
                    <div className="text-sm text-gray-400">{monster.type}</div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </Card>
      </div>

      {/* Compatibility and Fusion Controls */}
      <Card>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Fusion Analysis</h2>
          {selectedParent1 && selectedParent2 && (
            <div className="text-xl">
              Compatibility: <span className="text-accent">{compatibility}%</span>
            </div>
          )}
        </div>

        {selectedParent1 && selectedParent2 ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-2">Predicted Offspring Type:</h3>
                <div className="p-4 bg-gray-700 rounded-lg">
                  {selectedParent1.type} + {selectedParent2.type}
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Mutation Chance:</h3>
                <div className="p-4 bg-gray-700 rounded-lg">
                  {Math.round((100 - compatibility) / 2)}%
                </div>
              </div>
            </div>
            <button
              className="w-full bg-accent hover:bg-accent/90 text-white py-3 rounded-lg transition-colors"
              disabled={compatibility < 50}
            >
              {compatibility < 50 ? 'Insufficient Compatibility' : 'Begin Fusion'}
            </button>
          </div>
        ) : (
          <p className="text-gray-400">Select two monsters to begin fusion analysis</p>
        )}
      </Card>
    </Container>
  );
};

export default FusionLab;
