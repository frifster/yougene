import mongoose, { Document, Schema } from 'mongoose';
import { IStatusEffect } from './Ability.js';

export interface IActiveStatusEffect extends IStatusEffect {
  id: string;
  sourceAbilityId: mongoose.Types.ObjectId;
  appliedAt: Date;
  lastTickAt?: Date;
}

export interface IMonster extends Document {
  _id: mongoose.Types.ObjectId;
  id: string;
  name: string;
  type: string;
  level: number;
  geneticStability: number;
  abilities: mongoose.Types.ObjectId[];
  stats: {
    health: number;
    attack: number;
    defense: number;
    speed: number;
    energy: number;
    maxEnergy: number;
  };
  abilityCooldowns: Map<string, {
    lastUsed: Date;
    cooldownDuration: number; // in seconds
  }>;
  activeStatusEffects: IActiveStatusEffect[];
  lastUsedAbility?: {
    abilityId: mongoose.Types.ObjectId;
    usedAt: Date;
  };
  parent1?: mongoose.Types.ObjectId;
  parent2?: mongoose.Types.ObjectId;
  generation: number;
  // Genetic properties
  dominantGenes: string[];
  recessiveGenes: string[];
  mutationRate: number;
  createdAt: Date;
  updatedAt: Date;
}

const ActiveStatusEffectSchema = new Schema({
  id: { type: String, required: true },
  type: { 
    type: String, 
    required: true, 
    enum: ['buff', 'debuff', 'dot', 'hot']
  },
  stat: { 
    type: String, 
    enum: ['attack', 'defense', 'speed', 'energy']
  },
  value: { type: Number, required: true },
  duration: { type: Number, required: true },
  tickRate: { type: Number },
  sourceAbilityId: { type: Schema.Types.ObjectId, ref: 'Ability', required: true },
  appliedAt: { type: Date, required: true },
  lastTickAt: { type: Date }
}, { _id: false });

const MonsterSchema: Schema = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  level: { type: Number, required: true, min: 1 },
  geneticStability: { type: Number, required: true, min: 0, max: 100 },
  abilities: [{ type: Schema.Types.ObjectId, ref: 'Ability' }],
  stats: {
    health: { type: Number, required: true, min: 1 },
    attack: { type: Number, required: true, min: 0 },
    defense: { type: Number, required: true, min: 0 },
    speed: { type: Number, required: true, min: 0 },
    energy: { type: Number, required: true, min: 0, max: 100 },
    maxEnergy: { type: Number, required: true, min: 0, max: 100 }
  },
  abilityCooldowns: {
    type: Map,
    of: {
      lastUsed: { type: Date, required: true },
      cooldownDuration: { type: Number, required: true }
    },
    default: {}
  },
  activeStatusEffects: [ActiveStatusEffectSchema],
  lastUsedAbility: {
    abilityId: { type: Schema.Types.ObjectId, ref: 'Ability' },
    usedAt: { type: Date }
  },
  parent1: { type: Schema.Types.ObjectId, ref: 'Monster' },
  parent2: { type: Schema.Types.ObjectId, ref: 'Monster' },
  generation: { type: Number, required: true, default: 0 },
  // Genetic properties
  dominantGenes: [{ type: String, required: true }],
  recessiveGenes: [{ type: String, required: true }],
  mutationRate: { type: Number, required: true, min: 0, max: 100 }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Add virtual property to transform _id to id
MonsterSchema.virtual('id').get(function(this: any) {
  return this._id.toHexString();
});

export default mongoose.model<IMonster>('Monster', MonsterSchema); 