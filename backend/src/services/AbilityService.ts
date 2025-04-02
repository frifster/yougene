import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import AbilityModel, { IAbility, IComboEffect, IStatusEffect } from '../models/Ability.js';
import { IActiveStatusEffect, IMonster } from '../models/Monster.js';
import { MonsterService } from './MonsterService.js';

export class AbilityService {
  private monsterService: MonsterService;

  constructor() {
    this.monsterService = new MonsterService();
  }

  async useAbility(monsterId: string, abilityId: string, targetId?: string): Promise<boolean> {
    const monster = await this.monsterService.getMonsterById(monsterId);
    const ability = await AbilityModel.findById(abilityId);
    const target = targetId ? await this.monsterService.getMonsterById(targetId) : monster;

    if (!monster || !ability || !target) {
      throw new Error('Monster, ability, or target not found');
    }

    // Check if ability is available
    if (!this.isAbilityAvailable(monster, ability)) {
      return false;
    }

    // Check if monster has enough energy
    if (monster.stats.energy < ability.energyCost) {
      return false;
    }

    // Check for combo effects
    const comboEffect = await this.checkForComboEffect(monster, ability);

    // Update monster's energy and cooldowns
    monster.stats.energy -= ability.energyCost;
    monster.abilityCooldowns.set(abilityId, {
      lastUsed: new Date(),
      cooldownDuration: this.calculateCooldownDuration(ability)
    });

    // Apply ability effects
    await this.applyAbilityEffects(ability, monster, target, comboEffect);

    // Update last used ability for combo tracking
    monster.lastUsedAbility = {
      abilityId: ability._id,
      usedAt: new Date()
    };

    await monster.save();
    if (target._id.toString() !== monster._id.toString()) {
      await target.save();
    }

    return true;
  }

  private async checkForComboEffect(monster: IMonster, currentAbility: IAbility): Promise<IStatusEffect | null> {
    if (!monster.lastUsedAbility) return null;

    const comboEffect = currentAbility.comboEffects.find(combo => 
      combo.requiredAbilityId.equals(monster.lastUsedAbility!.abilityId) &&
      (Date.now() - monster.lastUsedAbility!.usedAt.getTime()) / 1000 <= combo.timeWindow
    );

    return comboEffect?.bonusEffect || null;
  }

  private async applyAbilityEffects(
    ability: IAbility, 
    source: IMonster, 
    target: IMonster, 
    comboEffect: IStatusEffect | null
  ): Promise<void> {
    const now = new Date();

    // Apply regular status effects
    for (const effect of ability.statusEffects) {
      await this.applyStatusEffect(effect, ability._id, target);
    }

    // Apply combo effect if available
    if (comboEffect) {
      await this.applyStatusEffect(comboEffect, ability._id, target);
    }

    // Handle immediate effects (damage/healing)
    if (ability.type === 'damage') {
      const damage = this.calculateDamage(ability, source, target);
      target.stats.health = Math.max(0, target.stats.health - damage);
    } else if (ability.type === 'heal') {
      const healing = this.calculateHealing(ability, source, target);
      target.stats.health = Math.min(100, target.stats.health + healing);
    }
  }

  private async applyStatusEffect(
    effect: IStatusEffect,
    sourceAbilityId: mongoose.Types.ObjectId,
    target: IMonster
  ): Promise<void> {
    const now = new Date();
    const activeEffect: IActiveStatusEffect = {
      ...effect,
      id: uuidv4(),
      sourceAbilityId,
      appliedAt: now,
      lastTickAt: effect.tickRate ? now : undefined
    };

    // Remove any existing effects of the same type on the same stat
    target.activeStatusEffects = target.activeStatusEffects.filter(existing => 
      !(existing.type === effect.type && existing.stat === effect.stat)
    );

    target.activeStatusEffects.push(activeEffect);
  }

  async processStatusEffects(monsterId: string): Promise<void> {
    const monster = await this.monsterService.getMonsterById(monsterId);
    if (!monster) {
      throw new Error('Monster not found');
    }

    const now = new Date();
    const updatedEffects: IActiveStatusEffect[] = [];

    for (const effect of monster.activeStatusEffects) {
      const elapsedTime = (now.getTime() - effect.appliedAt.getTime()) / 1000;

      // Remove expired effects
      if (elapsedTime >= effect.duration) {
        continue;
      }

      // Process DoT/HoT effects
      if (effect.tickRate && effect.lastTickAt) {
        const timeSinceLastTick = (now.getTime() - effect.lastTickAt.getTime()) / 1000;
        if (timeSinceLastTick >= effect.tickRate) {
          if (effect.type === 'dot') {
            monster.stats.health = Math.max(0, monster.stats.health - effect.value);
          } else if (effect.type === 'hot') {
            monster.stats.health = Math.min(100, monster.stats.health + effect.value);
          }
          effect.lastTickAt = now;
        }
      }

      // Apply stat modifications
      if (effect.stat) {
        const multiplier = effect.type === 'buff' ? 1 : -1;
        if (effect.stat === 'accuracy') {
          // Handle accuracy separately since it's not in monster.stats
          // Store accuracy modifications in a separate field or handle it during ability usage
          continue;
        } else if (effect.stat in monster.stats) {
          const statKey = effect.stat as keyof typeof monster.stats;
          monster.stats[statKey] = Math.max(0, monster.stats[statKey] + (effect.value * multiplier));
        }
      }

      updatedEffects.push(effect);
    }

    monster.activeStatusEffects = updatedEffects;
    await monster.save();
  }

  private calculateDamage(ability: IAbility, source: IMonster, target: IMonster): number {
    let damage = ability.power * (source.stats.attack / target.stats.defense);
    
    // Apply type effectiveness (to be implemented)
    // const typeMultiplier = this.getTypeEffectiveness(ability.element, target.type);
    // damage *= typeMultiplier;

    // Apply random variation (±10%)
    const variation = 0.9 + Math.random() * 0.2;
    damage *= variation;

    return Math.round(damage);
  }

  private calculateHealing(ability: IAbility, source: IMonster, target: IMonster): number {
    let healing = ability.power * (1 + source.stats.attack / 100);
    
    // Apply random variation (±10%)
    const variation = 0.9 + Math.random() * 0.2;
    healing *= variation;

    return Math.round(healing);
  }

  async regenerateEnergy(monsterId: string): Promise<void> {
    const monster = await this.monsterService.getMonsterById(monsterId);
    if (!monster) {
      throw new Error('Monster not found');
    }

    // Regenerate energy (5% of max energy per minute)
    const energyRegenRate = 0.05;
    const timeSinceLastUpdate = (Date.now() - monster.updatedAt.getTime()) / 1000 / 60; // in minutes
    const energyToRegen = Math.floor(monster.stats.maxEnergy * energyRegenRate * timeSinceLastUpdate);

    monster.stats.energy = Math.min(monster.stats.maxEnergy, monster.stats.energy + energyToRegen);
    await monster.save();
  }

  isAbilityAvailable(monster: IMonster, ability: IAbility): boolean {
    const cooldown = monster.abilityCooldowns.get(ability._id.toString());
    if (!cooldown) return true;

    const timeSinceLastUse = (Date.now() - cooldown.lastUsed.getTime()) / 1000;
    return timeSinceLastUse >= cooldown.cooldownDuration;
  }

  getAbilityCooldownRemaining(monster: IMonster, abilityId: string): number {
    const cooldown = monster.abilityCooldowns.get(abilityId);
    if (!cooldown) return 0;

    const timeSinceLastUse = (Date.now() - cooldown.lastUsed.getTime()) / 1000;
    return Math.max(0, cooldown.cooldownDuration - timeSinceLastUse);
  }

  private calculateCooldownDuration(ability: IAbility): number {
    // Base cooldown is 30 seconds
    let cooldown = 30;

    // Adjust cooldown based on ability power and energy cost
    cooldown += ability.power * 0.5; // 0.5 seconds per power point
    cooldown += ability.energyCost * 0.3; // 0.3 seconds per energy cost

    // Cap cooldown at 180 seconds (3 minutes)
    return Math.min(180, cooldown);
  }

  async getAvailableAbilities(monsterId: string): Promise<IAbility[]> {
    const monster = await this.monsterService.getMonsterById(monsterId);
    if (!monster) {
      throw new Error('Monster not found');
    }

    const abilities = await AbilityModel.find({ _id: { $in: monster.abilities } });
    return abilities.filter(ability => 
      this.isAbilityAvailable(monster, ability) && 
      monster.stats.energy >= ability.energyCost
    );
  }
} 