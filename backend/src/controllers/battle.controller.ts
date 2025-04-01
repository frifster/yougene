import { Request, Response } from 'express';
import { Character } from '../models/battle';
import { BattleService } from '../services/battle.service';

export class BattleController {
  private battleService: BattleService;

  constructor() {
    this.battleService = new BattleService();
  }

  createBattle = async (req: Request, res: Response): Promise<void> => {
    try {
      const { player1, player2 } = req.body;
      const battle = this.battleService.createBattle(player1, player2);
      res.status(201).json(battle);
    } catch (error) {
      res.status(400).json({ error: 'Failed to create battle' });
    }
  };

  startBattle = async (req: Request, res: Response): Promise<void> => {
    try {
      const { battleId } = req.params;
      const battle = this.battleService.startBattle(battleId);
      res.json(battle);
    } catch (error) {
      res.status(400).json({ error: 'Failed to start battle' });
    }
  };

  executeTurn = async (req: Request, res: Response): Promise<void> => {
    try {
      const { battleId } = req.params;
      const { attackerId, defenderId } = req.body;
      const battle = this.battleService.executeTurn(battleId, attackerId, defenderId);
      res.json(battle);
    } catch (error) {
      res.status(400).json({ error: 'Failed to execute turn' });
    }
  };

  getBattle = async (req: Request, res: Response): Promise<void> => {
    try {
      const { battleId } = req.params;
      const battle = this.battleService.getBattle(battleId);
      if (!battle) {
        res.status(404).json({ error: 'Battle not found' });
        return;
      }
      res.json(battle);
    } catch (error) {
      res.status(400).json({ error: 'Failed to get battle' });
    }
  };

  getBattleLog = async (req: Request, res: Response): Promise<void> => {
    try {
      const { battleId } = req.params;
      const battleLog = this.battleService.getBattleLog(battleId);
      if (!battleLog) {
        res.status(404).json({ error: 'Battle log not found' });
        return;
      }
      res.json(battleLog);
    } catch (error) {
      res.status(400).json({ error: 'Failed to get battle log' });
    }
  };
} 