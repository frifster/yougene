import Monster, { IMonster } from '../models/Monster';
import { AppError } from '../utils/AppError';

export class BreedingService {
  static async breedMonsters(parent1Id: string, parent2Id: string): Promise<IMonster> {
    // Find both parent monsters
    const parent1 = await Monster.findById(parent1Id);
    const parent2 = await Monster.findById(parent2Id);

    if (!parent1 || !parent2) {
      throw new AppError('One or both parent monsters not found', 404);
    }

    // Calculate child stats (average of parents with some random variation)
    const randomFactor = 0.8 + Math.random() * 0.4; // Random factor between 0.8 and 1.2

    const childStats = {
      hp: Math.round((parent1.hp + parent2.hp) / 2 * randomFactor),
      attack: Math.round((parent1.attack + parent2.attack) / 2 * randomFactor),
      defense: Math.round((parent1.defense + parent2.defense) / 2 * randomFactor),
    };

    // Ensure minimum values
    childStats.hp = Math.max(1, childStats.hp);
    childStats.attack = Math.max(0, childStats.attack);
    childStats.defense = Math.max(0, childStats.defense);

    // Create child monster
    const childMonster = await Monster.create({
      name: `${parent1.name} Jr.`,
      level: 1, // Start at level 1
      hp: childStats.hp,
      attack: childStats.attack,
      defense: childStats.defense,
      description: `Offspring of ${parent1.name} and ${parent2.name}`,
      parent1: parent1._id,
      parent2: parent2._id,
      generation: Math.max(parent1.generation, parent2.generation) + 1
    });

    return childMonster;
  }
} 