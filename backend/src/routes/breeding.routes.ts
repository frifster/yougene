import { Router } from 'express';
import { BreedingController } from '../controllers/breeding.controller';
import { protect } from '../middleware/auth';

const router = Router();

// Breeding endpoint (protected by authentication)
router.post('/breed', protect, BreedingController.breedMonsters);

export default router; 