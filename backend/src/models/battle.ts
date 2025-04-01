export interface Character {
  id: string;
  name: string;
  health: number;
  maxHealth: number;
  attack: number;
  defense: number;
  speed: number;
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
}

export interface BattleAction {
  attackerId: string;
  defenderId: string;
  damage: number;
  timestamp: Date;
}

export interface BattleLog {
  battleId: string;
  actions: BattleAction[];
} 