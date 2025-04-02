import mongoose, { Document, Schema } from 'mongoose';

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
    energy: { type: Number, required: true, min: 0, max: 100 }
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