import { Server, Socket } from 'socket.io';
import { IMonster } from '../models/Monster.js';

export interface ServerToClientEvents {
  battleStateUpdate: (state: BattleState) => void;
  playerJoined: (player: PlayerInfo) => void;
  playerLeft: (playerId: string) => void;
  abilityUsed: (data: AbilityUseData) => void;
  error: (error: string) => void;
}

export interface ClientToServerEvents {
  joinBattle: (battleId: string) => void;
  leaveBattle: (battleId: string) => void;
  useAbility: (data: AbilityUseData) => void;
  moveMonster: (data: MovementData) => void;
  ready: (battleId: string) => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  userId: string;
  battleId?: string;
  playerInfo?: PlayerInfo;
}

export interface BattleState {
  battleId: string;
  players: PlayerInfo[];
  monsters: BattleMonster[];
  status: 'waiting' | 'in_progress' | 'finished';
  startTime?: Date;
  endTime?: Date;
}

export interface PlayerInfo {
  id: string;
  userId: string;
  monster: BattleMonster;
  ready: boolean;
}

export interface BattleMonster {
  id: string;
  monsterId: string;
  name: string;
  type: string;
  stats: {
    health: number;
    maxHealth: number;
    energy: number;
    maxEnergy: number;
    attack: number;
    defense: number;
    speed: number;
  };
  position: {
    x: number;
    y: number;
  };
  statusEffects: StatusEffect[];
  abilityCooldowns: Record<string, number>;
}

export interface StatusEffect {
  type: string;
  value: number;
  duration: number;
  source: string;
}

export interface AbilityUseData {
  battleId: string;
  monsterId: string;
  abilityId: string;
  targetPosition?: {
    x: number;
    y: number;
  };
  targetId?: string;
}

export interface MovementData {
  battleId: string;
  monsterId: string;
  position: {
    x: number;
    y: number;
  };
}

export type BattleServer = Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>;
export type BattleSocket = Socket<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>; 