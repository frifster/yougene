import React from 'react';
import MonsterGrid from '../components/monsters/MonsterGrid';
import { Monster } from '../store/slices/monsterSlice';

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
        health: 70,
        attack: 45,
        defense: 60,
        speed: 55
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '2',
      name: 'Pyro Drake',
      type: 'Pyro',
      level: 8,
      geneticStability: 92,
      abilities: ['Flame Burst', 'Heat Wave', 'Ember'],
      stats: {
        health: 65,
        attack: 75,
        defense: 50,
        speed: 70
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];

  const handleMonsterClick = (monster: Monster) => {
    // This will be replaced with navigation to monster detail view
    console.log('Monster clicked:', monster);
  };

  return (
    <div className="min-h-screen bg-background text-text p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Monster Collection</h1>
          <div className="text-text/60">
            {monsters.length} Monsters
          </div>
        </div>
        
        <MonsterGrid
          monsters={monsters}
          onMonsterClick={handleMonsterClick}
          showStats={true}
          size="md"
        />
      </div>
    </div>
  );
};

export default MonsterCollection; 