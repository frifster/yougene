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
  status: 'pending' | 'in_progress' | 'completed';
  player1: Character;
  player2: Character;
  currentTurn: number;
  winner?: string;
  createdAt: Date;
  updatedAt: Date;
  battlefield: {
    width: number;
    height: number;
    obstacles: Array<{ x: number; y: number; radius: number }>;
  };
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