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
    name: "Spore",
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
    description: "A powerful water attack with high pressure",
    power: 65,
    accuracy: 85,
    energyCost: 30,
    comboEffects: [
      {
        timeWindow: 5,
        bonusEffect: {
          type: "debuff",
          stat: "defense",
          value: 15,
          duration: 10
        }
      }
    ],
    range: 3
  },

  // Earth Abilities
  {
    name: "Rock Throw",
    type: "damage",
    element: "Earth",
    description: "Hurls a large rock at the target",
    power: 40,
    accuracy: 90,
    energyCost: 15,
    comboEffects: [
      {
        timeWindow: 5,
        bonusEffect: {
          type: "debuff",
          stat: "speed",
          value: 10,
          duration: 10
        }
      }
    ],
    range: 2
  },
  {
    name: "Earth Shield",
    type: "buff",
    element: "Earth",
    description: "Creates a protective barrier of earth",
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
    range: 2
  },
  {
    name: "Sand Attack",
    type: "status",
    element: "Earth",
    description: "Throws sand to reduce accuracy",
    power: 0,
    accuracy: 100,
    energyCost: 15,
    statusEffects: [
      {
        type: "debuff",
        stat: "accuracy",
        value: 20,
        duration: 15
      }
    ],
    range: 2
  },
  {
    name: "Earthquake",
    type: "damage",
    element: "Earth",
    description: "Causes ground to shake, damaging all enemies",
    power: 55,
    accuracy: 85,
    energyCost: 30,
    areaOfEffect: true,
    range: 3
  },

  // Air Abilities
  {
    name: "Wind Slash",
    type: "damage",
    element: "Air",
    description: "A sharp blade of wind",
    power: 45,
    accuracy: 95,
    energyCost: 20,
    comboEffects: [
      {
        timeWindow: 5,
        bonusEffect: {
          type: "buff",
          stat: "speed",
          value: 15,
          duration: 10
        }
      }
    ],
    range: 3
  },
  {
    name: "Air Current",
    type: "status",
    element: "Air",
    description: "Creates a strong wind current",
    power: 0,
    accuracy: 100,
    energyCost: 20,
    statusEffects: [
      {
        type: "debuff",
        stat: "accuracy",
        value: 15,
        duration: 15
      }
    ],
    areaOfEffect: true,
    range: 2
  },
  {
    name: "Gust",
    type: "damage",
    element: "Air",
    description: "A quick wind attack",
    power: 35,
    accuracy: 100,
    energyCost: 15,
    comboEffects: [
      {
        timeWindow: 5,
        bonusEffect: {
          type: "debuff",
          stat: "speed",
          value: 10,
          duration: 10
        }
      }
    ],
    range: 2
  },
  {
    name: "Hurricane",
    type: "damage",
    element: "Air",
    description: "A powerful wind storm that damages all enemies",
    power: 65,
    accuracy: 80,
    energyCost: 35,
    statusEffects: [
      {
        type: "debuff",
        stat: "accuracy",
        value: 20,
        duration: 15
      }
    ],
    areaOfEffect: true,
    range: 3
  },

  // Electric Abilities
  {
    name: "Thunder Bolt",
    type: "damage",
    element: "Electric",
    description: "A powerful lightning bolt",
    power: 60,
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
    range: 3
  },
  {
    name: "Static",
    type: "status",
    element: "Electric",
    description: "Creates a static field",
    power: 0,
    accuracy: 100,
    energyCost: 20,
    statusEffects: [
      {
        type: "debuff",
        stat: "speed",
        value: 15,
        duration: 15
      }
    ],
    areaOfEffect: true,
    range: 2
  },
  {
    name: "Lightning",
    type: "damage",
    element: "Electric",
    description: "A quick lightning strike",
    power: 45,
    accuracy: 95,
    energyCost: 20,
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
    name: "Thunder Wave",
    type: "status",
    element: "Electric",
    description: "A wave of thunder that paralyzes",
    power: 0,
    accuracy: 90,
    energyCost: 25,
    statusEffects: [
      {
        type: "debuff",
        stat: "speed",
        value: 25,
        duration: 20
      }
    ],
    areaOfEffect: true,
    range: 3
  },

  // Ice Abilities
  {
    name: "Ice Beam",
    type: "damage",
    element: "Ice",
    description: "A beam of freezing ice",
    power: 55,
    accuracy: 90,
    energyCost: 25,
    statusEffects: [
      {
        type: "debuff",
        stat: "speed",
        value: 20,
        duration: 15
      }
    ],
    range: 3
  },
  {
    name: "Frost Shield",
    type: "buff",
    element: "Ice",
    description: "Creates a protective ice barrier",
    power: 0,
    accuracy: 100,
    energyCost: 25,
    statusEffects: [
      {
        type: "buff",
        stat: "defense",
        value: 20,
        duration: 20
      }
    ],
    range: 2
  },
  {
    name: "Snow Ball",
    type: "damage",
    element: "Ice",
    description: "A ball of snow that can freeze",
    power: 40,
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
    range: 2
  },
  {
    name: "Blizzard",
    type: "damage",
    element: "Ice",
    description: "A powerful snowstorm that damages all enemies",
    power: 60,
    accuracy: 80,
    energyCost: 35,
    statusEffects: [
      {
        type: "debuff",
        stat: "speed",
        value: 25,
        duration: 15
      }
    ],
    areaOfEffect: true,
    range: 3
  },

  // Dark Abilities
  {
    name: "Shadow Ball",
    type: "damage",
    element: "Dark",
    description: "A ball of darkness",
    power: 50,
    accuracy: 90,
    energyCost: 25,
    statusEffects: [
      {
        type: "debuff",
        stat: "defense",
        value: 10,
        duration: 15
      }
    ],
    range: 3
  },
  {
    name: "Dark Pulse",
    type: "damage",
    element: "Dark",
    description: "A pulse of dark energy",
    power: 45,
    accuracy: 95,
    energyCost: 20,
    comboEffects: [
      {
        timeWindow: 5,
        bonusEffect: {
          type: "debuff",
          stat: "attack",
          value: 10,
          duration: 10
        }
      }
    ],
    range: 2
  },
  {
    name: "Night Shade",
    type: "status",
    element: "Dark",
    description: "Creates a shadowy area",
    power: 0,
    accuracy: 100,
    energyCost: 20,
    statusEffects: [
      {
        type: "debuff",
        stat: "accuracy",
        value: 15,
        duration: 15
      }
    ],
    areaOfEffect: true,
    range: 2
  },
  {
    name: "Dark Void",
    type: "damage",
    element: "Dark",
    description: "A powerful dark attack that can put enemies to sleep",
    power: 65,
    accuracy: 75,
    energyCost: 35,
    statusEffects: [
      {
        type: "debuff",
        stat: "accuracy",
        value: 25,
        duration: 20
      }
    ],
    areaOfEffect: true,
    range: 3
  },

  // Light Abilities
  {
    name: "Light Beam",
    type: "damage",
    element: "Light",
    description: "A beam of pure light",
    power: 55,
    accuracy: 95,
    energyCost: 25,
    statusEffects: [
      {
        type: "buff",
        stat: "accuracy",
        value: 10,
        duration: 15
      }
    ],
    range: 3
  },
  {
    name: "Solar Shield",
    type: "buff",
    element: "Light",
    description: "Creates a protective light barrier",
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
    name: "Sun Ray",
    type: "damage",
    element: "Light",
    description: "A powerful ray of sunlight",
    power: 50,
    accuracy: 90,
    energyCost: 25,
    comboEffects: [
      {
        timeWindow: 5,
        bonusEffect: {
          type: "buff",
          stat: "attack",
          value: 15,
          duration: 10
        }
      }
    ],
    range: 3
  },
  {
    name: "Solar Flare",
    type: "damage",
    element: "Light",
    description: "A powerful burst of solar energy",
    power: 70,
    accuracy: 80,
    energyCost: 35,
    statusEffects: [
      {
        type: "dot",
        value: 8,
        duration: 15,
        tickRate: 3
      }
    ],
    areaOfEffect: true,
    range: 3
  },

  // Dragon Abilities
  {
    name: "Dragon Breath",
    type: "damage",
    element: "Dragon",
    description: "A powerful breath attack",
    power: 60,
    accuracy: 90,
    energyCost: 30,
    statusEffects: [
      {
        type: "dot",
        value: 5,
        duration: 10,
        tickRate: 2
      }
    ],
    range: 3
  },
  {
    name: "Scale Shield",
    type: "buff",
    element: "Dragon",
    description: "Creates a protective scale barrier",
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
    range: 2
  },
  {
    name: "Dragon Claw",
    type: "damage",
    element: "Dragon",
    description: "A powerful claw attack",
    power: 55,
    accuracy: 95,
    energyCost: 25,
    comboEffects: [
      {
        timeWindow: 5,
        bonusEffect: {
          type: "buff",
          stat: "attack",
          value: 15,
          duration: 10
        }
      }
    ],
    range: 2
  },
  {
    name: "Dragon Rage",
    type: "damage",
    element: "Dragon",
    description: "A powerful dragon attack that increases attack",
    power: 65,
    accuracy: 85,
    energyCost: 35,
    statusEffects: [
      {
        type: "buff",
        stat: "attack",
        value: 20,
        duration: 15
      }
    ],
    range: 3
  }
]; 