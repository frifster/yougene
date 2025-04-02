import mongoose, { Document, Schema } from 'mongoose';

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
  createdAt: Date;
  updatedAt: Date;
}

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
  energyCost: { type: Number, required: true, min: 0 }
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