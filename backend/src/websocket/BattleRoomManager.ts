import { v4 as uuidv4 } from 'uuid';
import { BattleMonster, BattleServer, BattleSocket, BattleState, PlayerInfo, StatusEffect } from './types.js';

export class BattleRoomManager {
  private rooms: Map<string, BattleState>;
  private io: BattleServer;

  constructor(io: BattleServer) {
    this.rooms = new Map();
    this.io = io;
  }

  createBattleRoom(): string {
    const battleId = uuidv4();
    const initialState: BattleState = {
      battleId,
      players: [],
      monsters: [],
      status: 'waiting'
    };
    this.rooms.set(battleId, initialState);
    return battleId;
  }

  joinBattle(battleId: string, socket: BattleSocket, playerInfo: PlayerInfo): boolean {
    const room = this.rooms.get(battleId);
    if (!room) {
      socket.emit('error', 'Battle room not found');
      return false;
    }

    if (room.status !== 'waiting') {
      socket.emit('error', 'Battle already in progress');
      return false;
    }

    if (room.players.length >= 2) {
      socket.emit('error', 'Battle room is full');
      return false;
    }

    // Join socket room
    socket.join(battleId);
    socket.data.battleId = battleId;
    socket.data.playerInfo = playerInfo;

    // Add player to battle state
    room.players.push(playerInfo);
    room.monsters.push(playerInfo.monster);

    // Notify all players in the room
    this.io.to(battleId).emit('playerJoined', playerInfo);
    this.io.to(battleId).emit('battleStateUpdate', room);

    // Start battle if both players are ready
    if (room.players.length === 2 && room.players.every(p => p.ready)) {
      this.startBattle(battleId);
    }

    return true;
  }

  leaveBattle(battleId: string, socket: BattleSocket): void {
    const room = this.rooms.get(battleId);
    if (!room) return;

    // Remove player from battle state
    const playerIndex = room.players.findIndex(p => p.id === socket.data.playerInfo?.id);
    if (playerIndex !== -1) {
      const player = room.players[playerIndex];
      room.players.splice(playerIndex, 1);
      room.monsters = room.monsters.filter(m => m.id !== player.monster.id);

      // Notify remaining players
      this.io.to(battleId).emit('playerLeft', player.id);
      this.io.to(battleId).emit('battleStateUpdate', room);
    }

    // Leave socket room
    socket.leave(battleId);
    socket.data.battleId = undefined;
    socket.data.playerInfo = undefined;

    // Clean up empty rooms
    if (room.players.length === 0) {
      this.rooms.delete(battleId);
    }
  }

  setPlayerReady(battleId: string, socket: BattleSocket): void {
    const room = this.rooms.get(battleId);
    if (!room) return;

    const player = room.players.find(p => p.id === socket.data.playerInfo?.id);
    if (player) {
      player.ready = true;
      this.io.to(battleId).emit('battleStateUpdate', room);

      // Start battle if both players are ready
      if (room.players.length === 2 && room.players.every(p => p.ready)) {
        this.startBattle(battleId);
      }
    }
  }

  private startBattle(battleId: string): void {
    const room = this.rooms.get(battleId);
    if (!room) return;

    room.status = 'in_progress';
    room.startTime = new Date();
    this.io.to(battleId).emit('battleStateUpdate', room);
  }

  endBattle(battleId: string): void {
    const room = this.rooms.get(battleId);
    if (!room) return;

    room.status = 'finished';
    room.endTime = new Date();
    this.io.to(battleId).emit('battleStateUpdate', room);
  }

  getBattleState(battleId: string): BattleState | undefined {
    return this.rooms.get(battleId);
  }

  updateMonsterPosition(battleId: string, monsterId: string, position: { x: number; y: number }): void {
    const room = this.rooms.get(battleId);
    if (!room) return;

    const monster = room.monsters.find(m => m.id === monsterId);
    if (monster) {
      monster.position = position;
      this.io.to(battleId).emit('battleStateUpdate', room);
    }
  }

  updateMonsterStats(battleId: string, monsterId: string, stats: Partial<BattleMonster['stats']>): void {
    const room = this.rooms.get(battleId);
    if (!room) return;

    const monster = room.monsters.find(m => m.id === monsterId);
    if (monster) {
      monster.stats = { ...monster.stats, ...stats };
      this.io.to(battleId).emit('battleStateUpdate', room);
    }
  }

  updateMonsterStatusEffects(battleId: string, monsterId: string, statusEffects: StatusEffect[]): void {
    const room = this.rooms.get(battleId);
    if (!room) return;

    const monster = room.monsters.find(m => m.id === monsterId);
    if (monster) {
      monster.statusEffects = statusEffects;
      this.io.to(battleId).emit('battleStateUpdate', room);
    }
  }

  updateMonsterCooldowns(battleId: string, monsterId: string, cooldowns: Record<string, number>): void {
    const room = this.rooms.get(battleId);
    if (!room) return;

    const monster = room.monsters.find(m => m.id === monsterId);
    if (monster) {
      monster.abilityCooldowns = cooldowns;
      this.io.to(battleId).emit('battleStateUpdate', room);
    }
  }
} 