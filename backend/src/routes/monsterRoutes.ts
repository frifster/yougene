import { Router } from 'express';
import { MonsterController } from '../controllers/MonsterController.js';

const router = Router();
const monsterController = new MonsterController();

// Create a new monster
router.post('/', monsterController.createMonster.bind(monsterController));

// Get all monsters
router.get('/', monsterController.getAllMonsters.bind(monsterController));

// Get a specific monster by ID
router.get('/:id', monsterController.getMonsterById.bind(monsterController));

// Update a monster
router.put('/:id', monsterController.updateMonster.bind(monsterController));

// Delete a monster
router.delete('/:id', monsterController.deleteMonster.bind(monsterController));

// Breed monsters
router.post('/breed', monsterController.breedMonsters.bind(monsterController));

export default router; 