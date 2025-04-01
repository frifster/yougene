import React, { useState } from 'react';
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

interface BattleState {
  playerMonster: Monster | null;
  opponentMonster: Monster | null;
  turn: number;
  status: 'selecting' | 'battling' | 'finished';
  result: 'win' | 'loss' | 'draw' | null;
}

const BattleArena: React.FC = () => {
  const [battleState, setBattleState] = useState<BattleState>({
    playerMonster: null,
    opponentMonster: null,
    turn: 1,
    status: 'selecting',
    result: null
  });

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

  const generateOpponent = () => {
    // Simple opponent generation - will be replaced with actual logic
    return {
      id: 'opponent',
      name: 'Wild Monster',
      type: 'Terra',
      level: 6,
      geneticStability: 88,
      abilities: ['Rock Throw', 'Earthquake', 'Sandstorm'],
      stats: {
        vitality: 75,
        strength: 60,
        defense: 65,
        agility: 45,
        intelligence: 55
      }
    };
  };

  const startBattle = (selectedMonster: Monster) => {
    setBattleState({
      playerMonster: selectedMonster,
      opponentMonster: generateOpponent(),
      turn: 1,
      status: 'battling',
      result: null
    });
  };

  const endBattle = (result: 'win' | 'loss' | 'draw') => {
    setBattleState(prev => ({
      ...prev,
      status: 'finished',
      result
    }));
  };

  return (
    <div className="min-h-screen bg-background text-text p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Battle Arena</h1>

        {battleState.status === 'selecting' ? (
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Select Your Monster</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {availableMonsters.map((monster) => (
                <button
                  key={monster.id}
                  onClick={() => startBattle(monster)}
                  className="p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors text-left"
                >
                  <div className="font-semibold">{monster.name}</div>
                  <div className="text-sm text-gray-400">{monster.type}</div>
                  <div className="mt-2 text-sm">
                    Level: {monster.level}
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : battleState.status === 'battling' && battleState.playerMonster && battleState.opponentMonster ? (
          <div className="space-y-8">
            {/* Battle Field */}
            <div className="grid grid-cols-2 gap-8">
              {/* Player Monster */}
              <div className="bg-gray-800 rounded-lg p-6">
                <h2 className="text-2xl font-semibold mb-4">Your Monster</h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl">{battleState.playerMonster.name}</h3>
                    <span className="px-2 py-1 bg-primary/20 rounded text-sm">
                      {battleState.playerMonster.type}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Level:</span>
                      <span>{battleState.playerMonster.level}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Turn:</span>
                      <span>{battleState.turn}</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Abilities:</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {battleState.playerMonster.abilities.map((ability) => (
                        <button
                          key={ability}
                          className="p-2 bg-secondary/20 rounded hover:bg-secondary/30 transition-colors"
                        >
                          {ability}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Opponent Monster */}
              <div className="bg-gray-800 rounded-lg p-6">
                <h2 className="text-2xl font-semibold mb-4">Opponent</h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl">{battleState.opponentMonster.name}</h3>
                    <span className="px-2 py-1 bg-primary/20 rounded text-sm">
                      {battleState.opponentMonster.type}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Level:</span>
                      <span>{battleState.opponentMonster.level}</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Abilities:</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {battleState.opponentMonster.abilities.map((ability) => (
                        <div
                          key={ability}
                          className="p-2 bg-gray-700 rounded"
                        >
                          {ability}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Battle Controls */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">Battle Controls</h2>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => endBattle('win')}
                  className="bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg transition-colors"
                >
                  End Battle (Win)
                </button>
                <button
                  onClick={() => endBattle('loss')}
                  className="bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg transition-colors"
                >
                  End Battle (Loss)
                </button>
              </div>
            </div>
          </div>
        ) : battleState.status === 'finished' && battleState.result ? (
          <div className="bg-gray-800 rounded-lg p-6 text-center">
            <h2 className="text-2xl font-semibold mb-4">
              Battle {battleState.result === 'win' ? 'Victory' : 'Defeat'}!
            </h2>
            <button
              onClick={() => setBattleState({
                playerMonster: null,
                opponentMonster: null,
                turn: 1,
                status: 'selecting',
                result: null
              })}
              className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg transition-colors"
            >
              Start New Battle
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default BattleArena; 