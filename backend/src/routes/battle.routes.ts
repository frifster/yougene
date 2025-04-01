import { Router } from 'express';
import { BattleController } from '../controllers/battle.controller';

const router = Router();
const battleController = new BattleController();

// Create a new battle
router.post('/', battleController.createBattle);

// Start a battle
router.post('/:battleId/start', battleController.startBattle);

// Execute a turn in the battle
router.post('/:battleId/turn', battleController.executeTurn);

// Get battle status
router.get('/:battleId', battleController.getBattle);

// Get battle log
router.get('/:battleId/log', battleController.getBattleLog);

export default router; 