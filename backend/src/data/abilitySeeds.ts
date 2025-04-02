import mongoose from 'mongoose';
import { IAbility, IComboEffect, IStatusEffect } from '../models/Ability';

// Interface for seed data that only includes the fields we need
interface AbilitySeedData {
  name: string;
  type: 'damage' | 'heal' | 'buff' | 'debuff' | 'status';
  element: string;
  description: string;
  power: number;
  accuracy: number;
  energyCost: number;
  statusEffects?: IStatusEffect[];
  comboEffects?: Omit<IComboEffect, 'requiredAbilityId'>[];
  areaOfEffect?: boolean;
  range?: number;
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
    energyCost: 20,
    statusEffects: [
      {
        type: "buff",
        stat: "attack",
        value: 15,
        duration: 30
      },
      {
        type: "buff",
        stat: "defense",
        value: 10,
        duration: 30
      }
    ],
    range: 1
  },
  {
    name: "Heal",
    type: "heal",
    element: "Plant",
    description: "Restores HP to the user and applies regeneration",
    power: 30,
    accuracy: 100,
    energyCost: 25,
    statusEffects: [
      {
        type: "hot",
        value: 5,
        duration: 15,
        tickRate: 3
      }
    ],
    range: 3
  },
  {
    name: "Vine Whip",
    type: "damage",
    element: "Plant",
    description: "A powerful whip attack using vines",
    power: 45,
    accuracy: 90,
    energyCost: 15,
    comboEffects: [
      {
        timeWindow: 5,
        bonusEffect: {
          type: "buff",
          stat: "attack",
          value: 10,
          duration: 10
        }
      }
    ],
    range: 2
  },
  {
    name: "Spore Cloud",
    type: "status",
    element: "Plant",
    description: "Releases spores that weaken enemies",
    power: 0,
    accuracy: 85,
    energyCost: 20,
    statusEffects: [
      {
        type: "debuff",
        stat: "speed",
        value: 15,
        duration: 20
      },
      {
        type: "dot",
        value: 3,
        duration: 15,
        tickRate: 3
      }
    ],
    areaOfEffect: true,
    range: 2
  },

  // Fire Abilities
  {
    name: "Flame Burst",
    type: "damage",
    element: "Fire",
    description: "A burst of intense flames that can burn",
    power: 50,
    accuracy: 85,
    energyCost: 25,
    statusEffects: [
      {
        type: "dot",
        value: 5,
        duration: 10,
        tickRate: 2
      }
    ],
    range: 2
  },
  {
    name: "Heat Wave",
    type: "damage",
    element: "Fire",
    description: "A wave of heat that weakens defenses",
    power: 40,
    accuracy: 90,
    energyCost: 20,
    statusEffects: [
      {
        type: "debuff",
        stat: "defense",
        value: 10,
        duration: 15
      }
    ],
    areaOfEffect: true,
    range: 3
  },
  {
    name: "Ember",
    type: "damage",
    element: "Fire",
    description: "A small but reliable fire attack",
    power: 30,
    accuracy: 100,
    energyCost: 10,
    comboEffects: [
      {
        timeWindow: 5,
        bonusEffect: {
          type: "dot",
          value: 8,
          duration: 10,
          tickRate: 2
        }
      }
    ],
    range: 2
  },
  {
    name: "Inferno",
    type: "damage",
    element: "Fire",
    description: "A powerful fire attack with lasting damage",
    power: 70,
    accuracy: 75,
    energyCost: 35,
    statusEffects: [
      {
        type: "dot",
        value: 10,
        duration: 15,
        tickRate: 3
      }
    ],
    areaOfEffect: true,
    range: 3
  },

  // Water Abilities
  {
    name: "Water Jet",
    type: "damage",
    element: "Water",
    description: "A powerful stream of water",
    power: 45,
    accuracy: 95,
    energyCost: 20,
    comboEffects: [
      {
        timeWindow: 5,
        bonusEffect: {
          type: "debuff",
          stat: "speed",
          value: 15,
          duration: 10
        }
      }
    ],
    range: 3
  },
  {
    name: "Bubble Shield",
    type: "buff",
    element: "Water",
    description: "Creates a protective bubble barrier",
    power: 0,
    accuracy: 100,
    energyCost: 25,
    statusEffects: [
      {
        type: "buff",
        stat: "defense",
        value: 20,
        duration: 20
      },
      {
        type: "hot",
        value: 3,
        duration: 20,
        tickRate: 4
      }
    ],
    range: 2
  },
  {
    name: "Tidal Wave",
    type: "damage",
    element: "Water",
    description: "A massive wave that slows enemies",
    power: 60,
    accuracy: 80,
    energyCost: 30,
    statusEffects: [
      {
        type: "debuff",
        stat: "speed",
        value: 20,
        duration: 15
      }
    ],
    areaOfEffect: true,
    range: 3
  },
  {
    name: "Hydro Pump",
    type: "damage",
    element: "Water",
    description: "A powerful water attack that pushes back",
    power: 65,
    accuracy: 85,
    energyCost: 30,
    statusEffects: [
      {
        type: "debuff",
        stat: "attack",
        value: 15,
        duration: 10
      }
    ],
    range: 4
  },

  // Earth Abilities
  {
    name: "Rock Throw",
    type: "damage",
    element: "Earth",
    description: "Throws a large rock that slows",
    power: 40,
    accuracy: 90,
    energyCost: 15,
    statusEffects: [
      {
        type: "debuff",
        stat: "speed",
        value: 10,
        duration: 8
      }
    ],
    range: 3
  },
  {
    name: "Earth Shield",
    type: "buff",
    element: "Earth",
    description: "Creates a protective earth barrier",
    power: 0,
    accuracy: 100,
    energyCost: 25,
    statusEffects: [
      {
        type: "buff",
        stat: "defense",
        value: 25,
        duration: 20
      }
    ],
    range: 1
  },
  {
    name: "Sand Storm",
    type: "debuff",
    element: "Earth",
    description: "Creates a sand storm that reduces accuracy and deals damage",
    power: 20,
    accuracy: 100,
    energyCost: 25,
    statusEffects: [
      {
        type: "dot",
        value: 5,
        duration: 15,
        tickRate: 3
      }
    ],
    areaOfEffect: true,
    range: 3
  },
  {
    name: "Earthquake",
    type: "damage",
    element: "Earth",
    description: "A powerful ground-shaking attack",
    power: 55,
    accuracy: 85,
    energyCost: 30,
    statusEffects: [
      {
        type: "debuff",
        stat: "defense",
        value: 15,
        duration: 10
      }
    ],
    areaOfEffect: true,
    range: 1
  },

  // Air Abilities
  {
    name: "Wind Slash",
    type: "damage",
    element: "Air",
    description: "A sharp wind attack",
    power: 35,
    accuracy: 95,
    energyCost: 15,
    comboEffects: [
      {
        timeWindow: 5,
        bonusEffect: {
          type: "buff",
          stat: "speed",
          value: 10,
          duration: 8
        }
      }
    ],
    range: 2
  },
  {
    name: "Air Current",
    type: "buff",
    element: "Air",
    description: "Increases speed with wind currents",
    power: 0,
    accuracy: 100,
    energyCost: 20,
    statusEffects: [
      {
        type: "buff",
        stat: "speed",
        value: 25,
        duration: 15
      },
      {
        type: "buff",
        stat: "energy",
        value: 10,
        duration: 15
      }
    ],
    range: 2
  },
  {
    name: "Gust",
    type: "damage",
    element: "Air",
    description: "A quick wind attack",
    power: 30,
    accuracy: 100,
    energyCost: 10,
    statusEffects: [
      {
        type: "debuff",
        stat: "attack",
        value: 8,
        duration: 5
      }
    ],
    range: 2
  },
  {
    name: "Hurricane",
    type: "damage",
    element: "Air",
    description: "A powerful wind storm",
    power: 65,
    accuracy: 75,
    energyCost: 35,
    statusEffects: [
      {
        type: "dot",
        value: 8,
        duration: 12,
        tickRate: 3
      },
      {
        type: "debuff",
        stat: "accuracy",
        value: 20,
        duration: 10
      }
    ],
    areaOfEffect: true,
    range: 3
  }
]; 