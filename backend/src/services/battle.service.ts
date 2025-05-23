import { v4 as uuidv4 } from 'uuid';
import { IAbility, IStatusEffect } from '../models/Ability.js';
import { BattleAction, BattleLog, BattleState, Character } from '../models/battle.js';
import { AIService } from './ai.service.js';

export class BattleService {
  private battles: Map<string, BattleState> = new Map();
  private battleLogs: Map<string, BattleLog> = new Map();
  private abilityCooldowns: Map<string, Map<string, number>> = new Map();
  private aiService: AIService;

  constructor() {
    this.aiService = new AIService();
  }

  createBattle(player1: Character, player2: Character, isAIOpponent: boolean = false): BattleState {
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
      isAIOpponent,
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

  private calculateDamage(attacker: Character, defender: Character, ability?: IAbility): number {
    let baseDamage = ability ? ability.power : attacker.attack;
    let defense = defender.defense;

    // Apply status effects
    const attackBuffs = attacker.statusEffects.filter(e => e.type === 'buff');
    const defenseDebuffs = defender.statusEffects.filter(e => e.type === 'debuff');

    baseDamage *= (1 + attackBuffs.reduce((sum, e) => sum + e.value, 0) / 100);
    defense *= (1 - defenseDebuffs.reduce((sum, e) => sum + e.value, 0) / 100);

    return Math.max(0, baseDamage - defense);
  }

  private applyStatusEffects(target: Character, effects: IStatusEffect[]): void {
    target.statusEffects.push(...effects);
  }

  private updateStatusEffects(character: Character): void {
    character.statusEffects = character.statusEffects.filter(effect => {
      effect.duration--;
      return effect.duration > 0;
    });
  }

  private handleAreaOfEffect(battle: BattleState, attacker: Character, ability: IAbility): Character[] {
    const targets: Character[] = [];
    const { range } = ability;

    if (ability.areaOfEffect) {
      const distance = Math.sqrt(
        Math.pow(attacker.position.x - battle.player1.position.x, 2) +
        Math.pow(attacker.position.y - battle.player1.position.y, 2)
      );
      if (distance <= range) {
        targets.push(battle.player1);
      }

      const distance2 = Math.sqrt(
        Math.pow(attacker.position.x - battle.player2.position.x, 2) +
        Math.pow(attacker.position.y - battle.player2.position.y, 2)
      );
      if (distance2 <= range) {
        targets.push(battle.player2);
      }
    }

    return targets;
  }

  private updateComboPoints(attacker: Character, ability?: IAbility): number {
    if (ability) {
      attacker.comboPoints = Math.min(attacker.comboPoints + 1, 5);
      return attacker.comboPoints;
    }
    return 0;
  }

  async executeTurn(
    battleId: string,
    attackerId: string,
    defenderId: string,
    abilityId?: string,
    position?: { x: number; y: number }
  ): Promise<BattleState> {
    const battle = this.battles.get(battleId);
    if (!battle) {
      throw new Error('Battle not found');
    }

    if (battle.status !== 'in_progress') {
      throw new Error('Battle is not in progress');
    }

    const attacker = attackerId === battle.player1.id ? battle.player1 : battle.player2;
    const defender = defenderId === battle.player1.id ? battle.player1 : battle.player2;

    // Execute player's turn
    const updatedBattle = await this.executePlayerTurn(battle, attacker, defender, abilityId, position);

    // If it's an AI battle and the battle is still in progress, execute AI's turn
    if (updatedBattle.isAIOpponent && updatedBattle.status === 'in_progress') {
      const aiCharacter = attackerId === battle.player1.id ? battle.player2 : battle.player1;
      return this.executeAITurn(updatedBattle, aiCharacter);
    }

    return updatedBattle;
  }

  private async executePlayerTurn(
    battle: BattleState,
    attacker: Character,
    defender: Character,
    abilityId?: string,
    position?: { x: number; y: number }
  ): Promise<BattleState> {
    // Update position if provided
    if (position) {
      attacker.position = position;
    }

    // Handle ability usage
    let ability: IAbility | undefined;
    if (abilityId) {
      ability = attacker.abilities.find(a => a.id === abilityId);
      if (!ability) {
        throw new Error('Ability not found');
      }

      // Check cooldown
      const cooldowns = this.abilityCooldowns.get(battle.id)!;
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
    if (ability?.statusEffects) {
      this.applyStatusEffects(defender, ability.statusEffects);
      aoeTargets.forEach(target => {
        this.applyStatusEffects(target, ability!.statusEffects!);
      });
    }

    // Update combo points
    const comboPoints = this.updateComboPoints(attacker, ability);

    // Record action
    const action: BattleAction = {
      attackerId: attacker.id,
      defenderId: defender.id,
      abilityId,
      damage,
      comboPoints,
      statusEffects: ability?.statusEffects,
      position: attacker.position,
      timestamp: new Date(),
    };

    const battleLog = this.battleLogs.get(battle.id)!;
    battleLog.actions.push(action);
    battleLog.stats.totalDamage += damage;
    battleLog.stats.abilityUsage[abilityId || 'basic_attack'] = (battleLog.stats.abilityUsage[abilityId || 'basic_attack'] || 0) + 1;

    // Update status effects
    this.updateStatusEffects(attacker);
    this.updateStatusEffects(defender);
    aoeTargets.forEach(target => this.updateStatusEffects(target));

    // Update cooldowns
    const cooldowns = this.abilityCooldowns.get(battle.id)!;
    for (const [abilityId, remainingCooldown] of cooldowns.entries()) {
      if (remainingCooldown > 0) {
        cooldowns.set(abilityId, remainingCooldown - 1);
      }
    }

    // Check for winner
    if (defender.health === 0) {
      battle.status = 'completed';
      battle.winner = attacker.id;
      battleLog.endTime = new Date();
      battleLog.winner = attacker.id;
    }

    battle.updatedAt = new Date();
    return battle;
  }

  private async executeAITurn(battle: BattleState, aiCharacter: Character): Promise<BattleState> {
    // Get AI decision
    const decision = this.aiService.makeDecision(battle, aiCharacter);
    const defender = aiCharacter.id === battle.player1.id ? battle.player2 : battle.player1;

    // Execute AI's turn based on decision
    switch (decision.action) {
      case 'move':
        return this.executePlayerTurn(battle, aiCharacter, defender, undefined, decision.position);
      case 'ability':
        return this.executePlayerTurn(battle, aiCharacter, defender, decision.abilityId);
      case 'basic_attack':
        return this.executePlayerTurn(battle, aiCharacter, defender);
      default:
        throw new Error('Invalid AI decision');
    }
  }

  getBattle(battleId: string): BattleState | undefined {
    return this.battles.get(battleId);
  }

  getBattleLog(battleId: string): BattleLog | undefined {
    return this.battleLogs.get(battleId);
  }
} 