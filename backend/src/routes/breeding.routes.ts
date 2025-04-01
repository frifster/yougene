import { Router } from 'express';
import { BreedingController } from '../controllers/breeding.controller.js';
import { protect } from '../middleware/auth.js';

const router = Router();

// Breeding endpoint (protected by authentication)
router.post('/breed', protect, BreedingController.breedMonsters);

export default router; 