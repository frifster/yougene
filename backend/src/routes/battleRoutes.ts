import express from 'express';
import { Server } from 'socket.io';
import { BattleRoomManager } from '../websocket/BattleRoomManager.js';
import { BattleServer } from '../websocket/types.js';

const router = express.Router();

// Create a new battle room
router.post('/create', (req, res) => {
  const io = (req.app.get('io') as BattleServer);
  const battleManager = new BattleRoomManager(io);
  const battleId = battleManager.createBattleRoom();
  res.json({ battleId });
});

// Get battle state
router.get('/:battleId', (req, res) => {
  const io = (req.app.get('io') as BattleServer);
  const battleManager = new BattleRoomManager(io);
  const battleState = battleManager.getBattleState(req.params.battleId);
  
  if (!battleState) {
    return res.status(404).json({ error: 'Battle not found' });
  }
  
  res.json(battleState);
});

export default router; 