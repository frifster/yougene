import React, { useState } from 'react';
import { Monster } from '../../store/slices/monsterSlice';
import MonsterCard from './MonsterCard';

interface MonsterBattleProps {
  playerMonster: Monster;
  opponentMonster: Monster;
  onBattleEnd: (winner: Monster) => void;
  className?: string;
}

interface BattleState {
  currentTurn: 'player' | 'opponent';
  playerHealth: number;
  opponentHealth: number;
  lastAction?: string;
  isComplete: boolean;
}

const MonsterBattle: React.FC<MonsterBattleProps> = ({
  playerMonster,
  opponentMonster,
  onBattleEnd,
  className = '',
}) => {
  const [battleState, setBattleState] = useState<BattleState>({
    currentTurn: 'player',
    playerHealth: 100,
    opponentHealth: 100,
    isComplete: false,
  });

  const calculateDamage = (attacker: Monster, defender: Monster): number => {
    // Basic damage calculation based on stats
    const attack = attacker.stats.attack || 50;
    const defense = defender.stats.defense || 50;
    const baseDamage = Math.max(0, attack - defense / 2);
    
    // Add some randomness
    const randomFactor = 0.8 + Math.random() * 0.4;
    return Math.round(baseDamage * randomFactor);
  };

  const handlePlayerAttack = () => {
    if (battleState.isComplete) return;

    const damage = calculateDamage(playerMonster, opponentMonster);
    const newOpponentHealth = Math.max(0, battleState.opponentHealth - damage);
    
    setBattleState(prev => ({
      ...prev,
      opponentHealth: newOpponentHealth,
      currentTurn: 'opponent',
      lastAction: `${playerMonster.name} deals ${damage} damage!`,
    }));

    if (newOpponentHealth === 0) {
      setBattleState(prev => ({
        ...prev,
        isComplete: true,
      }));
      onBattleEnd(playerMonster);
    } else {
      // Trigger opponent's turn after a delay
      setTimeout(handleOpponentTurn, 1000);
    }
  };

  const handleOpponentTurn = () => {
    if (battleState.isComplete) return;

    const damage = calculateDamage(opponentMonster, playerMonster);
    const newPlayerHealth = Math.max(0, battleState.playerHealth - damage);
    
    setBattleState(prev => ({
      ...prev,
      playerHealth: newPlayerHealth,
      currentTurn: 'player',
      lastAction: `${opponentMonster.name} deals ${damage} damage!`,
    }));

    if (newPlayerHealth === 0) {
      setBattleState(prev => ({
        ...prev,
        isComplete: true,
      }));
      onBattleEnd(opponentMonster);
    }
  };

  const getHealthBarColor = (health: number) => {
    if (health > 60) return 'bg-green-500';
    if (health > 30) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Battle Arena */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Player Monster */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Your Monster</h3>
            <span className="text-sm text-text/60">HP: {battleState.playerHealth}</span>
          </div>
          <div className="relative">
            <MonsterCard monster={playerMonster} size="md" />
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700 rounded-full overflow-hidden">
              <div
                className={`h-full ${getHealthBarColor(battleState.playerHealth)} transition-all duration-300`}
                style={{ width: `${battleState.playerHealth}%` }}
              />
            </div>
          </div>
        </div>

        {/* Opponent Monster */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Opponent</h3>
            <span className="text-sm text-text/60">HP: {battleState.opponentHealth}</span>
          </div>
          <div className="relative">
            <MonsterCard monster={opponentMonster} size="md" />
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700 rounded-full overflow-hidden">
              <div
                className={`h-full ${getHealthBarColor(battleState.opponentHealth)} transition-all duration-300`}
                style={{ width: `${battleState.opponentHealth}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Battle Controls */}
      <div className="space-y-4">
        {/* Battle Status */}
        {battleState.lastAction && (
          <div className="text-center text-lg font-medium text-primary">
            {battleState.lastAction}
          </div>
        )}

        {/* Battle Controls */}
        <div className="flex justify-center gap-4">
          <button
            onClick={handlePlayerAttack}
            disabled={battleState.currentTurn !== 'player' || battleState.isComplete}
            className={`
              px-6 py-3 rounded-lg font-medium transition-colors
              ${battleState.currentTurn === 'player' && !battleState.isComplete
                ? 'bg-primary hover:bg-primary/90'
                : 'bg-gray-700 cursor-not-allowed'}
            `}
          >
            Attack
          </button>
        </div>

        {/* Battle Result */}
        {battleState.isComplete && (
          <div className="text-center text-xl font-bold text-primary">
            {battleState.playerHealth > 0 ? 'Victory!' : 'Defeat!'}
          </div>
        )}
      </div>
    </div>
  );
};

export default MonsterBattle; 