import { v4 as uuidv4 } from 'uuid';
import { Ability, BattleAction, BattleLog, BattleState, Character, StatusEffect } from '../models/battle.js';

export class BattleService {
  private battles: Map<string, BattleState> = new Map();
  private battleLogs: Map<string, BattleLog> = new Map();
  private abilityCooldowns: Map<string, Map<string, number>> = new Map();

  createBattle(player1: Character, player2: Character): BattleState {
    const battleId = uuidv4();
    const battle: BattleState = {
      id: battleId,
      status: 'pending',
      player1: {
        ...player1,
        energy: player1.maxEnergy,
        comboPoints: 0,
        statusEffects: [],
      },
      player2: {
        ...player2,
        energy: player2.maxEnergy,
        comboPoints: 0,
        statusEffects: [],
      },
      currentTurn: 1,
      battlefield: {
        width: 800,
        height: 600,
        obstacles: [],
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.battles.set(battleId, battle);
    this.battleLogs.set(battleId, {
      battleId,
      actions: [],
      startTime: new Date(),
      stats: {
        totalDamage: 0,
        totalHealing: 0,
        longestCombo: 0,
        abilityUsage: {},
      },
    });
    this.abilityCooldowns.set(battleId, new Map());

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

  private calculateDamage(attacker: Character, defender: Character, ability?: Ability): number {
    let baseDamage = ability ? ability.power : attacker.attack;
    let defense = defender.defense;

    // Apply status effects
    const attackBuffs = attacker.statusEffects.filter(e => e.type === 'buff');
    const defenseDebuffs = defender.statusEffects.filter(e => e.type === 'debuff');

    baseDamage *= (1 + attackBuffs.reduce((sum, e) => sum + e.value, 0) / 100);
    defense *= (1 - defenseDebuffs.reduce((sum, e) => sum + e.value, 0) / 100);

    return Math.max(0, baseDamage - defense);
  }

  private applyStatusEffects(target: Character, effects: StatusEffect[]): void {
    target.statusEffects.push(...effects);
  }

  private updateStatusEffects(character: Character): void {
    character.statusEffects = character.statusEffects.filter(effect => {
      effect.duration--;
      return effect.duration > 0;
    });
  }

  private handleAreaOfEffect(battle: BattleState, attacker: Character, ability: Ability): Character[] {
    const targets: Character[] = [];
    const { radius, shape } = ability.areaOfEffect!;

    if (shape === 'circle') {
      const distance = Math.sqrt(
        Math.pow(attacker.position.x - battle.player1.position.x, 2) +
        Math.pow(attacker.position.y - battle.player1.position.y, 2)
      );
      if (distance <= radius) {
        targets.push(battle.player1);
      }

      const distance2 = Math.sqrt(
        Math.pow(attacker.position.x - battle.player2.position.x, 2) +
        Math.pow(attacker.position.y - battle.player2.position.y, 2)
      );
      if (distance2 <= radius) {
        targets.push(battle.player2);
      }
    }

    return targets;
  }

  private updateComboPoints(attacker: Character, ability?: Ability): number {
    if (ability) {
      attacker.comboPoints = Math.min(attacker.comboPoints + 1, 5);
      return attacker.comboPoints;
    }
    return 0;
  }

  executeTurn(
    battleId: string,
    attackerId: string,
    defenderId: string,
    abilityId?: string,
    position?: { x: number; y: number }
  ): BattleState {
    const battle = this.battles.get(battleId);
    if (!battle) {
      throw new Error('Battle not found');
    }

    if (battle.status !== 'in_progress') {
      throw new Error('Battle is not in progress');
    }

    const attacker = attackerId === battle.player1.id ? battle.player1 : battle.player2;
    const defender = defenderId === battle.player1.id ? battle.player1 : battle.player2;

    // Update position if provided
    if (position) {
      attacker.position = position;
    }

    // Handle ability usage
    let ability: Ability | undefined;
    if (abilityId) {
      ability = attacker.abilities.find(a => a.id === abilityId);
      if (!ability) {
        throw new Error('Ability not found');
      }

      // Check cooldown
      const cooldowns = this.abilityCooldowns.get(battleId)!;
      if (cooldowns.has(abilityId)) {
        throw new Error('Ability is on cooldown');
      }

      // Check energy cost
      if (attacker.energy < ability.energyCost) {
        throw new Error('Not enough energy');
      }

      // Apply cooldown
      cooldowns.set(abilityId, ability.cooldown);
      attacker.energy -= ability.energyCost;
    }

    // Calculate damage
    const damage = this.calculateDamage(attacker, defender, ability);
    defender.health = Math.max(0, defender.health - damage);

    // Handle area of effect if applicable
    let aoeTargets: Character[] = [];
    if (ability?.areaOfEffect) {
      aoeTargets = this.handleAreaOfEffect(battle, attacker, ability);
      aoeTargets.forEach(target => {
        if (target.id !== defender.id) {
          const aoeDamage = this.calculateDamage(attacker, target, ability);
          target.health = Math.max(0, target.health - aoeDamage);
        }
      });
    }

    // Apply status effects
    if (ability?.effects) {
      this.applyStatusEffects(defender, ability.effects);
      aoeTargets.forEach(target => {
        this.applyStatusEffects(target, ability!.effects!);
      });
    }

    // Update combo points
    const comboPoints = this.updateComboPoints(attacker, ability);

    // Record action
    const action: BattleAction = {
      attackerId,
      defenderId,
      abilityId,
      damage,
      comboPoints,
      statusEffects: ability?.effects,
      position: attacker.position,
      timestamp: new Date(),
    };

    const battleLog = this.battleLogs.get(battleId)!;
    battleLog.actions.push(action);
    battleLog.stats.totalDamage += damage;
    battleLog.stats.abilityUsage[abilityId || 'basic_attack'] = (battleLog.stats.abilityUsage[abilityId || 'basic_attack'] || 0) + 1;

    // Update status effects
    this.updateStatusEffects(attacker);
    this.updateStatusEffects(defender);
    aoeTargets.forEach(target => this.updateStatusEffects(target));

    // Update cooldowns
    const cooldowns = this.abilityCooldowns.get(battleId)!;
    for (const [abilityId, remainingCooldown] of cooldowns.entries()) {
      if (remainingCooldown > 0) {
        cooldowns.set(abilityId, remainingCooldown - 1);
      }
    }

    // Check for winner
    if (defender.health === 0) {
      battle.status = 'completed';
      battle.winner = attackerId;
      battleLog.endTime = new Date();
      battleLog.winner = attackerId;
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