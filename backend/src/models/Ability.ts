import mongoose, { Document, Schema } from 'mongoose';

export interface IStatusEffect {
  type: 'buff' | 'debuff' | 'dot' | 'hot';  // dot = damage over time, hot = heal over time
  stat?: 'attack' | 'defense' | 'speed' | 'energy' | 'accuracy';
  value: number;
  duration: number; // in seconds
  tickRate?: number; // for dot/hot effects, in seconds
}

export interface IComboEffect {
  requiredAbilityId: mongoose.Types.ObjectId;
  timeWindow: number; // time window to perform combo in seconds
  bonusEffect: IStatusEffect;
}

export interface IAbility extends Document {
  _id: mongoose.Types.ObjectId;
  id: string;
  name: string;
  type: 'damage' | 'heal' | 'buff' | 'debuff' | 'status';
  element: string;
  description: string;
  power: number;
  accuracy: number;
  energyCost: number;
  cooldown: number; // cooldown in seconds
  statusEffects: IStatusEffect[];
  comboEffects: IComboEffect[];
  areaOfEffect: boolean;
  range: number; // 1 = melee, > 1 = ranged
  createdAt: Date;
  updatedAt: Date;
}

const StatusEffectSchema = new Schema({
  type: { 
    type: String, 
    required: true, 
    enum: ['buff', 'debuff', 'dot', 'hot']
  },
  stat: { 
    type: String, 
    enum: ['attack', 'defense', 'speed', 'energy', 'accuracy']
  },
  value: { type: Number, required: true },
  duration: { type: Number, required: true, min: 1 },
  tickRate: { type: Number, min: 1 }
}, { _id: false });

const ComboEffectSchema = new Schema({
  requiredAbilityId: { type: Schema.Types.ObjectId, ref: 'Ability', required: true },
  timeWindow: { type: Number, required: true, min: 1 },
  bonusEffect: { type: StatusEffectSchema, required: true }
}, { _id: false });

const AbilitySchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  type: { 
    type: String, 
    required: true, 
    enum: ['damage', 'heal', 'buff', 'debuff', 'status']
  },
  element: { type: String, required: true },
  description: { type: String, required: true },
  power: { type: Number, required: true, min: 0 },
  accuracy: { type: Number, required: true, min: 0, max: 100 },
  energyCost: { type: Number, required: true, min: 0 },
  cooldown: { type: Number, required: true, min: 0, default: 0 },
  statusEffects: [StatusEffectSchema],
  comboEffects: [ComboEffectSchema],
  areaOfEffect: { type: Boolean, default: false },
  range: { type: Number, required: true, min: 1, default: 1 }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Add virtual property to transform _id to id
AbilitySchema.virtual('id').get(function(this: any) {
  return this._id.toHexString();
});

export default mongoose.model<IAbility>('Ability', AbilitySchema); 