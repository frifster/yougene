import { Request, Response } from 'express';
import { z } from 'zod';
import { Character } from '../models/battle.js';
import { BattleService } from '../services/battle.service.js';

const executeTurnSchema = z.object({
  attackerId: z.string(),
  defenderId: z.string(),
  abilityId: z.string().optional(),
  position: z.object({
    x: z.number(),
    y: z.number(),
  }).optional(),
});

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
      const validatedData = executeTurnSchema.parse(req.body);
      const battle = this.battleService.executeTurn(
        battleId,
        validatedData.attackerId,
        validatedData.defenderId,
        validatedData.abilityId,
        validatedData.position
      );
      res.json(battle);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: 'Invalid request data', details: error.errors });
        return;
      }
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