import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import { BreedingService } from '../services/breeding.service';

// Validation schema for breeding request
const breedingSchema = z.object({
  parent1Id: z.string().min(1),
  parent2Id: z.string().min(1)
});

export class BreedingController {
  static async breedMonsters(req: Request, res: Response, next: NextFunction) {
    try {
      // Validate request body
      const { parent1Id, parent2Id } = breedingSchema.parse(req.body);

      // Breed the monsters
      const childMonster = await BreedingService.breedMonsters(parent1Id, parent2Id);

      res.status(201).json({
        status: 'success',
        data: {
          monster: childMonster
        }
      });
    } catch (error) {
      next(error);
    }
  }
} 