import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { starterAbilities } from '../data/abilitySeeds.js';
import { starterMonsters } from '../data/monsterSeeds.js';
import Ability from '../models/Ability.js';
import Monster from '../models/Monster.js';

// Load environment variables
dotenv.config();

async function seedDatabase() {
  try {
    // Get MongoDB URI from environment variables
    const mongoUri = process.env.MONGODB_URI;
    
    if (!mongoUri) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }

    // Connect to MongoDB
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Promise.all([
      Ability.deleteMany({}),
      Monster.deleteMany({})
    ]);
    console.log('Cleared existing data');

    // First pass: Create abilities without combo effects
    const abilitiesWithoutCombos = starterAbilities.map(ability => ({
      ...ability,
      comboEffects: undefined // Temporarily remove combo effects
    }));
    const createdAbilities = await Ability.insertMany(abilitiesWithoutCombos);
    console.log(`Created ${createdAbilities.length} abilities`);

    // Create a map of ability names to their IDs
    const abilityMap = new Map(
      createdAbilities.map(ability => [ability.name, ability._id])
    );

    // Second pass: Update abilities with combo effects
    for (const ability of starterAbilities) {
      if (ability.comboEffects) {
        const updatedComboEffects = ability.comboEffects.map(combo => ({
          ...combo,
          requiredAbilityId: abilityMap.get(ability.name) // Use the current ability's ID
        }));

        await Ability.findByIdAndUpdate(
          abilityMap.get(ability.name),
          { comboEffects: updatedComboEffects }
        );
      }
    }
    console.log('Updated abilities with combo effects');

    // Update monster abilities to use ability IDs
    const monstersWithAbilityIds = starterMonsters.map(monster => ({
      ...monster,
      abilities: monster.abilities.map(abilityName => abilityMap.get(abilityName))
    }));

    // Seed monsters
    const createdMonsters = await Monster.insertMany(monstersWithAbilityIds);
    console.log(`Created ${createdMonsters.length} monsters`);

    console.log('Database seeding completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seeding function
seedDatabase(); 