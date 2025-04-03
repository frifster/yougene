import mongoose, { Document, Schema } from 'mongoose';

export interface IBreedingAttempt extends Document {
  _id: mongoose.Types.ObjectId;
  id: string;
  parent1: mongoose.Types.ObjectId;
  parent2: mongoose.Types.ObjectId;
  child?: mongoose.Types.ObjectId;
  success: boolean;
  timestamp: Date;
  geneticCompatibility: number;
  mutationChance: number;
  specialConditions: {
    type: string;
    description: string;
    effect: string;
  }[];
  breedingCost: {
    energy: number;
    items: Array<{
      itemId: mongoose.Types.ObjectId;
      quantity: number;
    }>;
  };
  notes?: string;
}

const BreedingAttemptSchema = new Schema({
  parent1: { type: Schema.Types.ObjectId, ref: 'Monster', required: true },
  parent2: { type: Schema.Types.ObjectId, ref: 'Monster', required: true },
  child: { type: Schema.Types.ObjectId, ref: 'Monster' },
  success: { type: Boolean, required: true },
  timestamp: { type: Date, required: true, default: Date.now },
  geneticCompatibility: { type: Number, required: true, min: 0, max: 100 },
  mutationChance: { type: Number, required: true, min: 0, max: 100 },
  specialConditions: [{
    type: { type: String, required: true },
    description: { type: String, required: true },
    effect: { type: String, required: true }
  }],
  breedingCost: {
    energy: { type: Number, required: true, min: 0 },
    items: [{
      itemId: { type: Schema.Types.ObjectId, ref: 'Item' },
      quantity: { type: Number, required: true, min: 1 }
    }]
  },
  notes: { type: String }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Add virtual property to transform _id to id
BreedingAttemptSchema.virtual('id').get(function(this: any) {
  return this._id.toHexString();
});

export default mongoose.model<IBreedingAttempt>('BreedingAttempt', BreedingAttemptSchema); 