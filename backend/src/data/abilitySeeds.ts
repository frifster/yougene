import { IAbility } from '../models/Ability';

// Interface for seed data that only includes the fields we need
interface AbilitySeedData {
  name: string;
  type: 'damage' | 'heal' | 'buff' | 'debuff' | 'status';
  element: string;
  description: string;
  power: number;
  accuracy: number;
  energyCost: number;
}

export const starterAbilities: AbilitySeedData[] = [
  // Plant Abilities
  {
    name: "Growth",
    type: "buff",
    element: "Plant",
    description: "Increases the user's attack and defense stats",
    power: 0,
    accuracy: 100,
    energyCost: 20
  },
  {
    name: "Heal",
    type: "heal",
    element: "Plant",
    description: "Restores HP to the user",
    power: 30,
    accuracy: 100,
    energyCost: 25
  },
  {
    name: "Vine Whip",
    type: "damage",
    element: "Plant",
    description: "A powerful whip attack using vines",
    power: 45,
    accuracy: 90,
    energyCost: 15
  },
  {
    name: "Spore",
    type: "status",
    element: "Plant",
    description: "Releases spores that may cause sleep",
    power: 0,
    accuracy: 85,
    energyCost: 20
  },

  // Fire Abilities
  {
    name: "Flame Burst",
    type: "damage",
    element: "Fire",
    description: "A burst of intense flames",
    power: 50,
    accuracy: 85,
    energyCost: 25
  },
  {
    name: "Heat Wave",
    type: "damage",
    element: "Fire",
    description: "A wave of heat that may cause burns",
    power: 40,
    accuracy: 90,
    energyCost: 20
  },
  {
    name: "Ember",
    type: "damage",
    element: "Fire",
    description: "A small but reliable fire attack",
    power: 30,
    accuracy: 100,
    energyCost: 10
  },
  {
    name: "Inferno",
    type: "damage",
    element: "Fire",
    description: "A powerful fire attack that may cause burns",
    power: 70,
    accuracy: 75,
    energyCost: 35
  },

  // Water Abilities
  {
    name: "Water Jet",
    type: "damage",
    element: "Water",
    description: "A powerful stream of water",
    power: 45,
    accuracy: 95,
    energyCost: 20
  },
  {
    name: "Bubble Shield",
    type: "buff",
    element: "Water",
    description: "Creates a protective bubble barrier",
    power: 0,
    accuracy: 100,
    energyCost: 25
  },
  {
    name: "Tidal Wave",
    type: "damage",
    element: "Water",
    description: "A massive wave of water",
    power: 60,
    accuracy: 80,
    energyCost: 30
  },
  {
    name: "Hydro Pump",
    type: "damage",
    element: "Water",
    description: "A powerful water attack with high power",
    power: 65,
    accuracy: 85,
    energyCost: 30
  },

  // Earth Abilities
  {
    name: "Rock Throw",
    type: "damage",
    element: "Earth",
    description: "Throws a large rock at the target",
    power: 40,
    accuracy: 90,
    energyCost: 15
  },
  {
    name: "Earth Shield",
    type: "buff",
    element: "Earth",
    description: "Creates a protective earth barrier",
    power: 0,
    accuracy: 100,
    energyCost: 25
  },
  {
    name: "Sand Attack",
    type: "debuff",
    element: "Earth",
    description: "Throws sand to reduce accuracy",
    power: 0,
    accuracy: 100,
    energyCost: 15
  },
  {
    name: "Earthquake",
    type: "damage",
    element: "Earth",
    description: "A powerful ground-shaking attack",
    power: 55,
    accuracy: 85,
    energyCost: 30
  },

  // Air Abilities
  {
    name: "Wind Slash",
    type: "damage",
    element: "Air",
    description: "A sharp wind attack",
    power: 35,
    accuracy: 95,
    energyCost: 15
  },
  {
    name: "Air Current",
    type: "buff",
    element: "Air",
    description: "Increases speed with wind currents",
    power: 0,
    accuracy: 100,
    energyCost: 20
  },
  {
    name: "Gust",
    type: "damage",
    element: "Air",
    description: "A quick wind attack",
    power: 30,
    accuracy: 100,
    energyCost: 10
  },
  {
    name: "Hurricane",
    type: "damage",
    element: "Air",
    description: "A powerful wind storm",
    power: 65,
    accuracy: 75,
    energyCost: 35
  }
]; 