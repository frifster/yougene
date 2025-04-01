import { v4 as uuidv4 } from 'uuid';
import { BattleAction, BattleLog, BattleState, Character } from '../models/battle';

export class BattleService {
  private battles: Map<string, BattleState> = new Map();
  private battleLogs: Map<string, BattleLog> = new Map();

  createBattle(player1: Character, player2: Character): BattleState {
    const battleId = uuidv4();
    const battle: BattleState = {
      id: battleId,
      status: 'pending',
      player1,
      player2,
      currentTurn: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.battles.set(battleId, battle);
    this.battleLogs.set(battleId, { battleId, actions: [] });

    return battle;
  }

  startBattle(battleId: string): BattleState {
    const battle = this.battles.get(battleId);
    if (!battle) {
      throw new Error('Battle not found');
    }

    battle.status = 'in_progress';
    battle.updatedAt = new Date();
    return battle;
  }

  executeTurn(battleId: string, attackerId: string, defenderId: string): BattleState {
    const battle = this.battles.get(battleId);
    if (!battle) {
      throw new Error('Battle not found');
    }

    if (battle.status !== 'in_progress') {
      throw new Error('Battle is not in progress');
    }

    const attacker = attackerId === battle.player1.id ? battle.player1 : battle.player2;
    const defender = defenderId === battle.player1.id ? battle.player1 : battle.player2;

    // Calculate damage
    const damage = Math.max(0, attacker.attack - defender.defense);
    defender.health = Math.max(0, defender.health - damage);

    // Record action
    const action: BattleAction = {
      attackerId,
      defenderId,
      damage,
      timestamp: new Date(),
    };

    const battleLog = this.battleLogs.get(battleId);
    if (battleLog) {
      battleLog.actions.push(action);
    }

    // Check for winner
    if (defender.health === 0) {
      battle.status = 'completed';
      battle.winner = attackerId;
    }

    battle.updatedAt = new Date();
    return battle;
  }

  getBattle(battleId: string): BattleState | undefined {
    return this.battles.get(battleId);
  }

  getBattleLog(battleId: string): BattleLog | undefined {
    return this.battleLogs.get(battleId);
  }
} 