import mongoose from 'mongoose';
import { IMonster } from '../models/Monster.js';
import { MonsterService } from './MonsterService.js';

export class BreedingService {
  private monsterService: MonsterService;

  constructor() {
    this.monsterService = new MonsterService();
  }

  async breedMonsters(parent1Id: string, parent2Id: string): Promise<IMonster> {
    const parent1 = await this.monsterService.getMonsterById(parent1Id);
    const parent2 = await this.monsterService.getMonsterById(parent2Id);

    if (!parent1 || !parent2) {
      throw new Error('One or both parents not found');
    }

    // Calculate genetic stability
    const geneticStability = this.calculateGeneticStability(parent1, parent2);

    // Generate offspring genes
    const { dominantGenes, recessiveGenes } = this.generateOffspringGenes(parent1, parent2);

    // Calculate mutation rate
    const mutationRate = this.calculateMutationRate(parent1, parent2);

    // Generate offspring stats
    const stats = this.generateOffspringStats(parent1, parent2);

    // Generate offspring abilities
    const abilities = await this.generateOffspringAbilities(parent1, parent2);

    // Create offspring monster
    const offspring: Partial<IMonster> = {
      name: this.generateOffspringName(parent1, parent2),
      type: this.determineOffspringType(parent1, parent2),
      level: 1, // Start at level 1
      geneticStability,
      abilities,
      stats,
      parent1: parent1._id,
      parent2: parent2._id,
      generation: Math.max(parent1.generation, parent2.generation) + 1,
      dominantGenes,
      recessiveGenes,
      mutationRate
    };

    return this.monsterService.createMonster(offspring);
  }

  private calculateGeneticStability(parent1: IMonster, parent2: IMonster): number {
    // Base stability is average of parents
    const baseStability = (parent1.geneticStability + parent2.geneticStability) / 2;

    // Reduce stability based on generation difference
    const generationDiff = Math.abs(parent1.generation - parent2.generation);
    const stabilityReduction = generationDiff * 5;

    // Reduce stability based on type compatibility
    const typeCompatibility = parent1.type === parent2.type ? 0 : 10;

    return Math.max(0, Math.min(100, baseStability - stabilityReduction - typeCompatibility));
  }

  private generateOffspringGenes(parent1: IMonster, parent2: IMonster): {
    dominantGenes: string[];
    recessiveGenes: string[];
  } {
    // Combine and randomly select genes from parents
    const allDominantGenes = [...parent1.dominantGenes, ...parent2.dominantGenes];
    const allRecessiveGenes = [...parent1.recessiveGenes, ...parent2.recessiveGenes];

    // Randomly select 2-3 dominant genes
    const dominantGenes = this.randomSelectGenes(allDominantGenes, 2, 3);
    // Randomly select 1-2 recessive genes
    const recessiveGenes = this.randomSelectGenes(allRecessiveGenes, 1, 2);

    return { dominantGenes, recessiveGenes };
  }

  private randomSelectGenes(genes: string[], min: number, max: number): string[] {
    const count = Math.floor(Math.random() * (max - min + 1)) + min;
    const shuffled = [...genes].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  private calculateMutationRate(parent1: IMonster, parent2: IMonster): number {
    // Base mutation rate is average of parents
    const baseRate = (parent1.mutationRate + parent2.mutationRate) / 2;

    // Increase mutation rate based on generation difference
    const generationDiff = Math.abs(parent1.generation - parent2.generation);
    const mutationIncrease = generationDiff * 2;

    // Increase mutation rate based on type incompatibility
    const typeIncompatibility = parent1.type === parent2.type ? 0 : 5;

    return Math.min(100, baseRate + mutationIncrease + typeIncompatibility);
  }

  private generateOffspringStats(parent1: IMonster, parent2: IMonster): {
    health: number;
    attack: number;
    defense: number;
    speed: number;
    energy: number;
  } {
    // Calculate base stats as weighted average of parents
    const stats = {
      health: Math.round((parent1.stats.health + parent2.stats.health) / 2),
      attack: Math.round((parent1.stats.attack + parent2.stats.attack) / 2),
      defense: Math.round((parent1.stats.defense + parent2.stats.defense) / 2),
      speed: Math.round((parent1.stats.speed + parent2.stats.speed) / 2),
      energy: Math.round((parent1.stats.energy + parent2.stats.energy) / 2)
    };

    // Apply random variation (±10%)
    Object.keys(stats).forEach(key => {
      const stat = key as keyof typeof stats;
      const variation = stats[stat] * 0.1;
      stats[stat] = Math.round(stats[stat] + (Math.random() * variation * 2 - variation));
    });

    return stats;
  }

  private async generateOffspringAbilities(parent1: IMonster, parent2: IMonster): Promise<mongoose.Types.ObjectId[]> {
    // Combine abilities from both parents
    const allAbilities = [...new Set([...parent1.abilities, ...parent2.abilities])];

    // Randomly select 2-3 abilities
    const count = Math.floor(Math.random() * 2) + 2; // 2 or 3 abilities
    const shuffled = [...allAbilities].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  private generateOffspringName(parent1: IMonster, parent2: IMonster): string {
    // Simple name generation - combine parts of parent names
    const name1 = parent1.name.slice(0, Math.ceil(parent1.name.length / 2));
    const name2 = parent2.name.slice(Math.floor(parent2.name.length / 2));
    return name1 + name2;
  }

  private determineOffspringType(parent1: IMonster, parent2: IMonster): string {
    // If parents are same type, offspring is same type
    if (parent1.type === parent2.type) {
      return parent1.type;
    }

    // If different types, randomly inherit one parent's type
    return Math.random() < 0.5 ? parent1.type : parent2.type;
  }
} 