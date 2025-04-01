import React, { useState } from 'react';
import { Card, Container, Grid } from '../components/layout';

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
    result: null,
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
        intelligence: 55,
      },
    };
  };

  const startBattle = (selectedMonster: Monster) => {
    setBattleState({
      playerMonster: selectedMonster,
      opponentMonster: generateOpponent(),
      turn: 1,
      status: 'battling',
      result: null,
    });
  };

  const endBattle = (result: 'win' | 'loss' | 'draw') => {
    setBattleState(prev => ({
      ...prev,
      status: 'finished',
      result,
    }));
  };

  return (
    <Container>
      <h1 className="text-4xl font-bold mb-8 text-text drop-shadow-lg">Battle Arena</h1>

      {battleState.status === 'selecting' ? (
        <Card>
          <h2 className="text-2xl font-semibold mb-4 text-text">Select Your Monster</h2>
          <Grid cols={3} gap="md">
            {availableMonsters.map(monster => (
              <button
                key={monster.id}
                onClick={() => startBattle(monster)}
                className="p-4 bg-white/10 backdrop-blur-lg rounded-xl hover:bg-white/20 transition-all duration-300 text-left"
              >
                <div className="font-semibold text-text">{monster.name}</div>
                <div className="text-sm text-text/60">{monster.type}</div>
                <div className="mt-2 text-sm text-text/80">Level: {monster.level}</div>
              </button>
            ))}
          </Grid>
        </Card>
      ) : battleState.status === 'battling' &&
        battleState.playerMonster &&
        battleState.opponentMonster ? (
        <div className="space-y-8">
          {/* Battle Field */}
          <Grid cols={2} gap="lg">
            {/* Player Monster */}
            <Card>
              <h2 className="text-2xl font-semibold mb-4 text-text">Your Monster</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl text-text">{battleState.playerMonster.name}</h3>
                  <span className="px-2 py-1 bg-primary/20 rounded text-sm text-primary">
                    {battleState.playerMonster.type}
                  </span>
                </div>
                <div className="space-y-2 text-text/80">
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
                  <h3 className="font-semibold mb-2 text-text">Abilities:</h3>
                  <Grid cols={2} gap="sm">
                    {battleState.playerMonster.abilities.map(ability => (
                      <button
                        key={ability}
                        className="p-2 bg-secondary/20 rounded hover:bg-secondary/30 transition-colors text-text"
                      >
                        {ability}
                      </button>
                    ))}
                  </Grid>
                </div>
              </div>
            </Card>

            {/* Opponent Monster */}
            <Card>
              <h2 className="text-2xl font-semibold mb-4 text-text">Opponent</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl text-text">{battleState.opponentMonster.name}</h3>
                  <span className="px-2 py-1 bg-primary/20 rounded text-sm text-primary">
                    {battleState.opponentMonster.type}
                  </span>
                </div>
                <div className="space-y-2 text-text/80">
                  <div className="flex justify-between">
                    <span>Level:</span>
                    <span>{battleState.opponentMonster.level}</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2 text-text">Abilities:</h3>
                  <Grid cols={2} gap="sm">
                    {battleState.opponentMonster.abilities.map(ability => (
                      <div key={ability} className="p-2 bg-white/10 rounded text-text/80">
                        {ability}
                      </div>
                    ))}
                  </Grid>
                </div>
              </div>
            </Card>
          </Grid>

          {/* Battle Controls */}
          <Card>
            <h2 className="text-2xl font-semibold mb-4 text-text">Battle Controls</h2>
            <Grid cols={2} gap="md">
              <button
                onClick={() => endBattle('win')}
                className="bg-primary hover:bg-primary-dark text-white py-3 rounded-xl transition-colors shadow-xl hover:shadow-primary/20"
              >
                End Battle (Win)
              </button>
              <button
                onClick={() => endBattle('loss')}
                className="bg-accent hover:bg-accent/90 text-white py-3 rounded-xl transition-colors shadow-xl hover:shadow-accent/20"
              >
                End Battle (Loss)
              </button>
            </Grid>
          </Card>
        </div>
      ) : battleState.status === 'finished' && battleState.result ? (
        <Card>
          <h2 className="text-2xl font-semibold mb-4 text-text">
            Battle {battleState.result === 'win' ? 'Victory' : 'Defeat'}!
          </h2>
          <button
            onClick={() =>
              setBattleState({
                playerMonster: null,
                opponentMonster: null,
                turn: 1,
                status: 'selecting',
                result: null,
              })
            }
            className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-xl transition-colors shadow-xl hover:shadow-primary/20"
          >
            Start New Battle
          </button>
        </Card>
      ) : null}
    </Container>
  );
};

export default BattleArena;
