import { EventEmitter } from 'events';
import { Server } from 'socket.io';
import { v4 as uuidv4 } from 'uuid';
import { BattleMonster, BattleServer, BattleSocket, BattleState, PlayerInfo, StatusEffect } from './types.js';

export class BattleRoomManager extends EventEmitter {
  private battles: Map<string, BattleState>;
  private io: BattleServer;

  constructor(io: BattleServer) {
    super();
    this.battles = new Map();
    this.io = io;
  }

  createBattleRoom(): string {
    const battleId = uuidv4();
    const battleState: BattleState = {
      id: battleId,
      players: new Map(),
      monsters: new Map(),
      status: 'waiting',
      startTime: undefined,
      endTime: undefined,
    };
    this.battles.set(battleId, battleState);
    this.emit('roomCreated', battleId);
    return battleId;
  }

  joinBattle(battleId: string, socket: BattleSocket, playerInfo: PlayerInfo): boolean {
    const room = this.battles.get(battleId);
    if (!room) {
      socket.emit('error', 'Battle room not found');
      return false;
    }

    if (room.status !== 'waiting') {
      socket.emit('error', 'Battle already in progress');
      return false;
    }

    if (room.players.size >= 2) {
      socket.emit('error', 'Battle room is full');
      return false;
    }

    // Join socket room
    socket.join(battleId);
    socket.data.battleId = battleId;
    socket.data.playerInfo = playerInfo;

    // Add player to battle state
    room.players.set(playerInfo.id, playerInfo);
    room.monsters.set(playerInfo.monster.id, playerInfo.monster);

    // Notify all players in the room
    this.io.to(battleId).emit('playerJoined', playerInfo);
    this.io.to(battleId).emit('battleStateUpdate', room);

    // Start battle if both players are ready
    if (room.players.size === 2 && Array.from(room.players.values()).every(p => p.ready)) {
      this.startBattle(battleId);
    }

    return true;
  }

  leaveBattle(battleId: string, socket: BattleSocket): void {
    const room = this.battles.get(battleId);
    if (!room) return;

    const playerInfo = socket.data.playerInfo;
    if (!playerInfo) return;

    // Remove player from battle state
    room.players.delete(playerInfo.id);
    room.monsters.delete(playerInfo.monster.id);

    // Notify remaining players
    this.io.to(battleId).emit('playerLeft', playerInfo.id);
    this.io.to(battleId).emit('battleStateUpdate', room);

    // Leave socket room
    socket.leave(battleId);
    socket.data.battleId = undefined;
    socket.data.playerInfo = undefined;

    // Clean up empty rooms
    if (room.players.size === 0) {
      this.battles.delete(battleId);
    }
  }

  setPlayerReady(battleId: string, socket: BattleSocket): void {
    const room = this.battles.get(battleId);
    if (!room) return;

    const playerInfo = socket.data.playerInfo;
    if (!playerInfo) return;

    const player = room.players.get(playerInfo.id);
    if (player) {
      player.ready = true;
      this.io.to(battleId).emit('battleStateUpdate', room);

      // Start battle if both players are ready
      if (room.players.size === 2 && Array.from(room.players.values()).every(p => p.ready)) {
        this.startBattle(battleId);
      }
    }
  }

  private startBattle(battleId: string): void {
    const room = this.battles.get(battleId);
    if (!room) return;

    room.status = 'in_progress';
    room.startTime = new Date();
    this.io.to(battleId).emit('battleStateUpdate', room);
  }

  endBattle(battleId: string): void {
    const room = this.battles.get(battleId);
    if (!room) return;

    room.status = 'finished';
    room.endTime = new Date();
    this.battles.delete(battleId);
    this.emit('roomEnded', battleId);
  }

  getBattleState(battleId: string): BattleState | undefined {
    return this.battles.get(battleId);
  }

  updateMonsterPosition(battleId: string, monsterId: string, position: { x: number; y: number }): void {
    const room = this.battles.get(battleId);
    if (!room) return;

    const monster = room.monsters.get(monsterId);
    if (monster) {
      monster.position = position;
      this.io.to(battleId).emit('battleStateUpdate', room);
    }
  }

  updateMonsterStats(battleId: string, monsterId: string, stats: Partial<BattleMonster['stats']>): void {
    const room = this.battles.get(battleId);
    if (!room) return;

    const monster = room.monsters.get(monsterId);
    if (monster) {
      monster.stats = { ...monster.stats, ...stats };
      this.io.to(battleId).emit('battleStateUpdate', room);
    }
  }

  updateMonsterStatusEffects(battleId: string, monsterId: string, statusEffects: StatusEffect[]): void {
    const room = this.battles.get(battleId);
    if (!room) return;

    const monster = room.monsters.get(monsterId);
    if (monster) {
      monster.statusEffects = statusEffects;
      this.io.to(battleId).emit('battleStateUpdate', room);
    }
  }

  updateMonsterCooldowns(battleId: string, monsterId: string, cooldowns: Record<string, number>): void {
    const room = this.battles.get(battleId);
    if (!room) return;

    const monster = room.monsters.get(monsterId);
    if (monster) {
      monster.abilityCooldowns = cooldowns;
      this.io.to(battleId).emit('battleStateUpdate', room);
    }
  }
} 