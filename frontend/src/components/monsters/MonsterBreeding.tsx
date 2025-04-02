import React, { useState } from 'react';
import { monsterApi } from '../../api/monsterApi';
import { Monster } from '../../store/slices/monsterSlice';
import MonsterCard from './MonsterCard';

interface MonsterBreedingProps {
  availableMonsters: Monster[];
  onBreed: (offspring: Monster) => void;
  className?: string;
}

const MonsterBreeding: React.FC<MonsterBreedingProps> = ({
  availableMonsters,
  onBreed,
  className = '',
}) => {
  const [selectedParent1, setSelectedParent1] = useState<Monster | null>(null);
  const [selectedParent2, setSelectedParent2] = useState<Monster | null>(null);
  const [isBreeding, setIsBreeding] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleMonsterSelect = (monster: Monster) => {
    if (!selectedParent1) {
      setSelectedParent1(monster);
    } else if (!selectedParent2 && monster.id !== selectedParent1.id) {
      setSelectedParent2(monster);
    }
  };

  const handleBreed = async () => {
    if (!selectedParent1 || !selectedParent2) return;

    setIsBreeding(true);
    setError(null);

    try {
      const offspring = await monsterApi.breedMonsters(selectedParent1.id, selectedParent2.id);
      onBreed(offspring);
      setSelectedParent1(null);
      setSelectedParent2(null);
    } catch (err) {
      setError('Failed to breed monsters. Please try again.');
      console.error('Breeding error:', err);
    } finally {
      setIsBreeding(false);
    }
  };

  const handleReset = () => {
    setSelectedParent1(null);
    setSelectedParent2(null);
    setError(null);
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Breeding Interface */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Parent 1 Selection */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Parent 1</h3>
          <div className="min-h-[300px] bg-gray-800 rounded-lg p-4">
            {selectedParent1 ? (
              <div className="space-y-4">
                <MonsterCard monster={selectedParent1} size="sm" />
                <button
                  onClick={() => setSelectedParent1(null)}
                  className="w-full px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                >
                  Remove Parent 1
                </button>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center">
                <span className="text-text/40">Select Parent 1</span>
              </div>
            )}
          </div>
        </div>

        {/* Parent 2 Selection */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Parent 2</h3>
          <div className="min-h-[300px] bg-gray-800 rounded-lg p-4">
            {selectedParent2 ? (
              <div className="space-y-4">
                <MonsterCard monster={selectedParent2} size="sm" />
                <button
                  onClick={() => setSelectedParent2(null)}
                  className="w-full px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                >
                  Remove Parent 2
                </button>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center">
                <span className="text-text/40">Select Parent 2</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Breeding Controls */}
      <div className="space-y-4">
        {error && (
          <div className="text-center text-red-400 bg-red-500/10 py-2 rounded-lg">
            {error}
          </div>
        )}

        <div className="flex gap-4 justify-center">
          <button
            onClick={handleBreed}
            disabled={!selectedParent1 || !selectedParent2 || isBreeding}
            className={`
              px-6 py-3 rounded-lg font-medium transition-colors
              ${selectedParent1 && selectedParent2 && !isBreeding
                ? 'bg-primary hover:bg-primary/90'
                : 'bg-gray-700 cursor-not-allowed'}
            `}
          >
            {isBreeding ? 'Breeding...' : 'Breed Monsters'}
          </button>
          <button
            onClick={handleReset}
            disabled={isBreeding}
            className="px-6 py-3 bg-gray-700 rounded-lg font-medium hover:bg-gray-600 transition-colors disabled:opacity-50"
          >
            Reset Selection
          </button>
        </div>
      </div>

      {/* Available Monsters Grid */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Available Monsters</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {availableMonsters.map(monster => (
            <div
              key={monster.id}
              className={`
                transition-all duration-300
                ${selectedParent1?.id === monster.id || selectedParent2?.id === monster.id
                  ? 'opacity-50 cursor-not-allowed'
                  : 'cursor-pointer hover:scale-105'}
              `}
              onClick={() => handleMonsterSelect(monster)}
            >
              <MonsterCard
                monster={monster}
                size="sm"
                showStats={false}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MonsterBreeding; 