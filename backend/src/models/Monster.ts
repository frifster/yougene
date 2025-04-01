import mongoose, { Document, Schema } from 'mongoose';

export interface IMonster extends Document {
  name: string;
  level: number;
  hp: number;
  attack: number;
  defense: number;
  description: string;
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
}, {
  timestamps: true
});

export default mongoose.model<IMonster>('Monster', MonsterSchema); 