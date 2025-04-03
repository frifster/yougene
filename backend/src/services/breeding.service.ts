import mongoose from 'mongoose';
import BreedingAttempt, { IBreedingAttempt } from '../models/Breeding.js';
import Monster, { IMonster } from '../models/Monster.js';
import { AppError } from '../utils/AppError.js';

export class BreedingService {
  // Breeding limits and thresholds
  private static readonly BASE_BREEDING_COST = 50;
  private static readonly MAX_GENERATION = 10;
  private static readonly GENETIC_STABILITY_THRESHOLD = 70;
  private static readonly MUTATION_RATE_INCREASE = 5;
  private static readonly PERFECT_MATCH_THRESHOLD = 90;
  private static readonly HIGH_COMPATIBILITY_THRESHOLD = 80;

  // Genetic inheritance probabilities
  private static readonly DOMINANT_GENE_INHERITANCE_CHANCE = 0.7;
  private static readonly RECESSIVE_GENE_INHERITANCE_CHANCE = 0.3;
  private static readonly DOMINANT_MUTATION_CHANCE = 0.7;

  // Stat calculation factors
  private static readonly STAT_RANDOMIZATION_MIN = 0.8;
  private static readonly STAT_RANDOMIZATION_RANGE = 0.4;
  private static readonly HIGH_COMPATIBILITY_STAT_BONUS = 1.1;
  private static readonly GENERATION_STABILITY_PENALTY = 5;

  // Breeding cost multipliers
  private static readonly GENERATION_COST_MULTIPLIER = 1;

  public static async breedMonsters(
    parent1Id: string,
    parent2Id: string,
    userId: string
  ): Promise<{ child: IMonster; attempt: IBreedingAttempt }> {
    // Find both parent monsters
    const parent1 = await Monster.findById(parent1Id);
    const parent2 = await Monster.findById(parent2Id);

    if (!parent1 || !parent2) {
      throw new AppError('One or both parent monsters not found', 404);
    }

    // Validate breeding conditions
    this.validateBreedingConditions(parent1, parent2);

    // Calculate breeding parameters
    const geneticCompatibility = this.calculateGeneticCompatibility(parent1, parent2);
    const mutationChance = this.calculateMutationChance(parent1, parent2);
    const specialConditions = this.checkSpecialConditions(parent1, parent2);
    const breedingCost = this.calculateBreedingCost(parent1, parent2);

    // Create breeding attempt record
    const breedingAttempt = await BreedingAttempt.create({
      parent1: parent1._id,
      parent2: parent2._id,
      success: false,
      geneticCompatibility,
      mutationChance,
      specialConditions,
      breedingCost
    });

    try {
      // Calculate child stats with genetic inheritance
      const childStats = this.calculateChildStats(parent1, parent2, geneticCompatibility, mutationChance);

      // Determine inherited genes
      const { dominantGenes, recessiveGenes } = this.inheritGenes(parent1, parent2, mutationChance);

      // Create child monster
      const childMonster = await Monster.create({
        name: this.generateChildName(parent1, parent2),
        type: this.determineChildType(parent1, parent2),
        level: 1,
        geneticStability: this.calculateGeneticStability(parent1, parent2),
        abilities: this.inheritAbilities(parent1, parent2),
        stats: childStats,
        parent1: parent1._id,
        parent2: parent2._id,
        generation: Math.max(parent1.generation, parent2.generation) + 1,
        dominantGenes,
        recessiveGenes,
        mutationRate: this.calculateMutationRate(parent1, parent2)
      });

      // Update breeding attempt with success
      breedingAttempt.child = childMonster._id;
      breedingAttempt.success = true;
      await breedingAttempt.save();

      return { child: childMonster, attempt: breedingAttempt };
    } catch (error) {
      breedingAttempt.notes = error instanceof Error ? error.message : 'Unknown error';
      await breedingAttempt.save();
      throw error;
    }
  }

  private static validateBreedingConditions(parent1: IMonster, parent2: IMonster): void {
    if (parent1.generation >= this.MAX_GENERATION || parent2.generation >= this.MAX_GENERATION) {
      throw new AppError('Monster has reached maximum generation limit', 400);
    }

    if (parent1.geneticStability < this.GENETIC_STABILITY_THRESHOLD || 
        parent2.geneticStability < this.GENETIC_STABILITY_THRESHOLD) {
      throw new AppError('Monster genetic stability too low for breeding', 400);
    }

    if (parent1.type !== parent2.type) {
      throw new AppError('Cannot breed monsters of different types', 400);
    }
  }

  private static calculateGeneticCompatibility(parent1: IMonster, parent2: IMonster): number {
    const geneOverlap = parent1.dominantGenes.filter(gene => 
      parent2.dominantGenes.includes(gene) || parent2.recessiveGenes.includes(gene)
    ).length;

    const totalUniqueGenes = new Set([
      ...parent1.dominantGenes,
      ...parent1.recessiveGenes,
      ...parent2.dominantGenes,
      ...parent2.recessiveGenes
    ]).size;

    return Math.round((geneOverlap / totalUniqueGenes) * 100);
  }

  private static calculateMutationChance(parent1: IMonster, parent2: IMonster): number {
    const baseMutationRate = (parent1.mutationRate + parent2.mutationRate) / 2;
    const generationFactor = Math.min(parent1.generation, parent2.generation) * this.MUTATION_RATE_INCREASE;
    return Math.min(100, baseMutationRate + generationFactor);
  }

  private static checkSpecialConditions(parent1: IMonster, parent2: IMonster): Array<{ type: string; description: string; effect: string }> {
    const conditions = [];

    // Check for rare gene combinations
    const rareGenes = parent1.dominantGenes.filter(gene => 
      parent2.dominantGenes.includes(gene) && 
      parent1.recessiveGenes.includes(gene) && 
      parent2.recessiveGenes.includes(gene)
    );

    if (rareGenes.length > 0) {
      conditions.push({
        type: 'rare_gene_combination',
        description: 'Rare gene combination detected',
        effect: 'increased_stats'
      });
    }

    // Check for perfect genetic match
    if (this.calculateGeneticCompatibility(parent1, parent2) > this.PERFECT_MATCH_THRESHOLD) {
      conditions.push({
        type: 'perfect_match',
        description: 'Perfect genetic compatibility',
        effect: 'guaranteed_success'
      });
    }

    return conditions;
  }

  private static calculateBreedingCost(parent1: IMonster, parent2: IMonster): { energy: number; items: Array<{ itemId: mongoose.Types.ObjectId; quantity: number }> } {
    const baseEnergy = this.BASE_BREEDING_COST;
    const generationMultiplier = Math.max(parent1.generation, parent2.generation) * this.GENERATION_COST_MULTIPLIER;
    const energy = baseEnergy * generationMultiplier;

    return {
      energy,
      items: [] // Add special breeding items if needed
    };
  }

  private static calculateChildStats(
    parent1: IMonster,
    parent2: IMonster,
    geneticCompatibility: number,
    mutationChance: number
  ): IMonster['stats'] {
    const compatibilityFactor = geneticCompatibility / 100;
    const mutationFactor = mutationChance / 100;

    const stats = {
      health: Math.round((parent1.stats.health + parent2.stats.health) / 2 * (this.STAT_RANDOMIZATION_MIN + Math.random() * this.STAT_RANDOMIZATION_RANGE)),
      attack: Math.round((parent1.stats.attack + parent2.stats.attack) / 2 * (this.STAT_RANDOMIZATION_MIN + Math.random() * this.STAT_RANDOMIZATION_RANGE)),
      defense: Math.round((parent1.stats.defense + parent2.stats.defense) / 2 * (this.STAT_RANDOMIZATION_MIN + Math.random() * this.STAT_RANDOMIZATION_RANGE)),
      speed: Math.round((parent1.stats.speed + parent2.stats.speed) / 2 * (this.STAT_RANDOMIZATION_MIN + Math.random() * this.STAT_RANDOMIZATION_RANGE)),
      energy: Math.round((parent1.stats.energy + parent2.stats.energy) / 2 * (this.STAT_RANDOMIZATION_MIN + Math.random() * this.STAT_RANDOMIZATION_RANGE)),
      maxEnergy: Math.round((parent1.stats.maxEnergy + parent2.stats.maxEnergy) / 2 * (this.STAT_RANDOMIZATION_MIN + Math.random() * this.STAT_RANDOMIZATION_RANGE))
    };

    // Apply genetic compatibility bonus
    if (geneticCompatibility > this.HIGH_COMPATIBILITY_THRESHOLD) {
      Object.keys(stats).forEach(stat => {
        stats[stat as keyof typeof stats] = Math.round(stats[stat as keyof typeof stats] * this.HIGH_COMPATIBILITY_STAT_BONUS);
      });
    }

    // Apply mutation effects
    if (Math.random() < mutationFactor) {
      const statToMutate = Object.keys(stats)[Math.floor(Math.random() * Object.keys(stats).length)] as keyof typeof stats;
      stats[statToMutate] = Math.round(stats[statToMutate] * (this.STAT_RANDOMIZATION_MIN + Math.random() * this.STAT_RANDOMIZATION_RANGE));
    }

    return stats;
  }

  private static inheritGenes(
    parent1: IMonster,
    parent2: IMonster,
    mutationChance: number
  ): { dominantGenes: string[]; recessiveGenes: string[] } {
    const dominantGenes = new Set<string>();
    const recessiveGenes = new Set<string>();

    // Inherit dominant genes
    parent1.dominantGenes.forEach(gene => {
      if (Math.random() < this.DOMINANT_GENE_INHERITANCE_CHANCE) dominantGenes.add(gene);
    });
    parent2.dominantGenes.forEach(gene => {
      if (Math.random() < this.DOMINANT_GENE_INHERITANCE_CHANCE) dominantGenes.add(gene);
    });

    // Inherit recessive genes
    parent1.recessiveGenes.forEach(gene => {
      if (Math.random() < this.RECESSIVE_GENE_INHERITANCE_CHANCE) recessiveGenes.add(gene);
    });
    parent2.recessiveGenes.forEach(gene => {
      if (Math.random() < this.RECESSIVE_GENE_INHERITANCE_CHANCE) recessiveGenes.add(gene);
    });

    // Apply mutations
    if (Math.random() < mutationChance / 100) {
      const newGene = `mutated_gene_${Date.now()}`;
      if (Math.random() < this.DOMINANT_MUTATION_CHANCE) {
        dominantGenes.add(newGene);
      } else {
        recessiveGenes.add(newGene);
      }
    }

    return {
      dominantGenes: Array.from(dominantGenes),
      recessiveGenes: Array.from(recessiveGenes)
    };
  }

  private static generateChildName(parent1: IMonster, parent2: IMonster): string {
    const prefix = parent1.name.slice(0, Math.floor(parent1.name.length / 2));
    const suffix = parent2.name.slice(Math.floor(parent2.name.length / 2));
    return `${prefix}${suffix}`;
  }

  private static determineChildType(parent1: IMonster, parent2: IMonster): string {
    return parent1.type; // For now, inherit type from parent1
  }

  private static calculateGeneticStability(parent1: IMonster, parent2: IMonster): number {
    const baseStability = (parent1.geneticStability + parent2.geneticStability) / 2;
    const generationPenalty = Math.max(parent1.generation, parent2.generation) * this.GENERATION_STABILITY_PENALTY;
    return Math.max(0, Math.min(100, baseStability - generationPenalty));
  }

  private static inheritAbilities(parent1: IMonster, parent2: IMonster): mongoose.Types.ObjectId[] {
    const inheritedAbilities = new Set<mongoose.Types.ObjectId>();

    // Inherit abilities from both parents with 70% chance for each
    parent1.abilities.forEach(ability => {
      if (Math.random() < this.DOMINANT_GENE_INHERITANCE_CHANCE) inheritedAbilities.add(ability);
    });
    parent2.abilities.forEach(ability => {
      if (Math.random() < this.DOMINANT_GENE_INHERITANCE_CHANCE) inheritedAbilities.add(ability);
    });

    return Array.from(inheritedAbilities);
  }

  private static calculateMutationRate(parent1: IMonster, parent2: IMonster): number {
    const baseRate = (parent1.mutationRate + parent2.mutationRate) / 2;
    const generationIncrease = Math.max(parent1.generation, parent2.generation) * this.MUTATION_RATE_INCREASE;
    return Math.min(100, baseRate + generationIncrease);
  }
} 