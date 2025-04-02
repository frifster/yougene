import mongoose from 'mongoose';
import { IMonster } from '../models/Monster';

// Interface for seed data that only includes the fields we need
interface MonsterSeedData {
  name: string;
  type: string;
  level: number;
  geneticStability: number;
  abilities: string[]; // Will store ability names, will be converted to IDs during seeding
  stats: {
    health: number;
    attack: number;
    defense: number;
    speed: number;
    energy: number;
    maxEnergy: number;
  };
  dominantGenes: string[];
  recessiveGenes: string[];
  mutationRate: number;
  generation: number;
  parent1?: mongoose.Types.ObjectId;
  parent2?: mongoose.Types.ObjectId;
}

export const starterMonsters: MonsterSeedData[] = [
  {
    name: "Flora Sprout",
    type: "Plant",
    level: 1,
    geneticStability: 100,
    abilities: ["Growth", "Heal", "Vine Whip", "Spore"],
    stats: {
      health: 100,
      attack: 15,
      defense: 20,
      speed: 10,
      energy: 100,
      maxEnergy: 100
    },
    dominantGenes: ["Growth", "Resilience"],
    recessiveGenes: ["Regeneration"],
    mutationRate: 5,
    generation: 0,
    parent1: undefined,
    parent2: undefined
  },
  {
    name: "Pyro Drake",
    type: "Fire",
    level: 1,
    geneticStability: 100,
    abilities: ["Flame Burst", "Heat Wave", "Ember", "Inferno"],
    stats: {
      health: 90,
      attack: 25,
      defense: 15,
      speed: 15,
      energy: 100,
      maxEnergy: 100
    },
    dominantGenes: ["Fire", "Speed"],
    recessiveGenes: ["Heat"],
    mutationRate: 3,
    generation: 0,
    parent1: undefined,
    parent2: undefined
  },
  {
    name: "Aqua Nymph",
    type: "Water",
    level: 1,
    geneticStability: 100,
    abilities: ["Water Jet", "Bubble Shield", "Tidal Wave", "Hydro Pump"],
    stats: {
      health: 95,
      attack: 20,
      defense: 18,
      speed: 12,
      energy: 100,
      maxEnergy: 100
    },
    dominantGenes: ["Water", "Agility"],
    recessiveGenes: ["Flow"],
    mutationRate: 4,
    generation: 0,
    parent1: undefined,
    parent2: undefined
  },
  {
    name: "Terra Golem",
    type: "Earth",
    level: 1,
    geneticStability: 100,
    abilities: ["Rock Throw", "Earth Shield", "Sand Attack", "Earthquake"],
    stats: {
      health: 120,
      attack: 18,
      defense: 25,
      speed: 8,
      energy: 100,
      maxEnergy: 100
    },
    dominantGenes: ["Earth", "Strength"],
    recessiveGenes: ["Stability"],
    mutationRate: 2,
    generation: 0,
    parent1: undefined,
    parent2: undefined
  },
  {
    name: "Aero Swift",
    type: "Air",
    level: 1,
    geneticStability: 100,
    abilities: ["Wind Slash", "Air Current", "Gust", "Hurricane"],
    stats: {
      health: 85,
      attack: 22,
      defense: 12,
      speed: 20,
      energy: 100,
      maxEnergy: 100
    },
    dominantGenes: ["Air", "Swiftness"],
    recessiveGenes: ["Wind"],
    mutationRate: 6,
    generation: 0,
    parent1: undefined,
    parent2: undefined
  }
];

// Monster types available in the game
export const monsterTypes = [
  "Plant",
  "Fire",
  "Water",
  "Earth",
  "Air",
  "Electric",
  "Ice",
  "Dark",
  "Light",
  "Dragon"
];

// Genetic traits available for inheritance
export const geneticTraits = {
  dominant: [
    "Growth",
    "Resilience",
    "Fire",
    "Speed",
    "Water",
    "Agility",
    "Earth",
    "Strength",
    "Air",
    "Swiftness",
    "Electric",
    "Power",
    "Ice",
    "Control",
    "Dark",
    "Stealth",
    "Light",
    "Radiance",
    "Dragon",
    "Might"
  ],
  recessive: [
    "Regeneration",
    "Heat",
    "Flow",
    "Stability",
    "Wind",
    "Thunder",
    "Frost",
    "Shadow",
    "Glow",
    "Scale"
  ]
};

// Abilities available for each monster type
export const abilities = {
  Plant: ["Growth", "Heal", "Vine Whip", "Spore"],
  Fire: ["Flame Burst", "Heat Wave", "Ember", "Inferno"],
  Water: ["Water Jet", "Bubble Shield", "Tidal Wave", "Hydro Pump"],
  Earth: ["Rock Throw", "Earth Shield", "Sand Attack", "Earthquake"],
  Air: ["Wind Slash", "Air Current", "Gust", "Hurricane"],
  Electric: ["Thunder Bolt", "Static", "Lightning", "Thunder Wave"],
  Ice: ["Ice Beam", "Frost Shield", "Snow Ball", "Blizzard"],
  Dark: ["Shadow Ball", "Dark Pulse", "Night Shade", "Dark Void"],
  Light: ["Light Beam", "Solar Shield", "Sun Ray", "Solar Flare"],
  Dragon: ["Dragon Breath", "Scale Shield", "Dragon Claw", "Dragon Rage"]
}; 