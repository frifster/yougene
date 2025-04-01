import mongoose, { Document, Schema } from 'mongoose';

export interface IMonster extends Document {
  id: string;
  name: string;
  level: number;
  hp: number;
  attack: number;
  defense: number;
  description: string;
  parent1?: mongoose.Types.ObjectId;
  parent2?: mongoose.Types.ObjectId;
  generation: number;
  createdAt: Date;
  updatedAt: Date;
}

const MonsterSchema: Schema = new Schema({
  name: { type: String, required: true },
  level: { type: Number, required: true, min: 1 },
  hp: { type: Number, required: true, min: 1 },
  attack: { type: Number, required: true, min: 0 },
  defense: { type: Number, required: true, min: 0 },
  description: { type: String, required: true },
  parent1: { type: Schema.Types.ObjectId, ref: 'Monster' },
  parent2: { type: Schema.Types.ObjectId, ref: 'Monster' },
  generation: { type: Number, required: true, default: 0 }
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