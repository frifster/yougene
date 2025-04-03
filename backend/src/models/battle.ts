import { IAbility, IStatusEffect } from './Ability.js';

export interface Character {
  id: string;
  name: string;
  health: number;
  maxHealth: number;
  attack: number;
  defense: number;
  speed: number;
  energy: number;
  maxEnergy: number;
  position: { x: number; y: number };
  abilities: IAbility[];
  statusEffects: IStatusEffect[];
  comboPoints: number;
}

export interface BattleState {
  id: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  player1: Character;
  player2: Character;
  currentTurn: number;
  battlefield: {
    width: number;
    height: number;
    obstacles: Array<{
      x: number;
      y: number;
      width: number;
      height: number;
    }>;
  };
  winner?: string;
  createdAt: Date;
  updatedAt: Date;
  isAIOpponent: boolean;
}

export interface BattleAction {
  attackerId: string;
  defenderId: string;
  abilityId?: string;
  damage: number;
  healing?: number;
  comboPoints?: number;
  statusEffects?: IStatusEffect[];
  timestamp: Date;
  position?: { x: number; y: number };
}

export interface BattleLog {
  battleId: string;
  actions: BattleAction[];
  startTime: Date;
  endTime?: Date;
  winner?: string;
  stats: {
    totalDamage: number;
    totalHealing: number;
    longestCombo: number;
    abilityUsage: Record<string, number>;
  };
} 