import { Request, Response } from 'express';
import { AbilityService } from '../services/AbilityService.js';

export class AbilityController {
  private abilityService: AbilityService;

  constructor() {
    this.abilityService = new AbilityService();
  }

  async useAbility(req: Request, res: Response): Promise<void> {
    try {
      const { monsterId, abilityId } = req.params;
      const { targetId } = req.body;
      const success = await this.abilityService.useAbility(monsterId, abilityId, targetId);

      if (!success) {
        res.status(400).json({ 
          error: 'Ability cannot be used. It may be on cooldown or the monster may not have enough energy.' 
        });
        return;
      }

      res.json({ message: 'Ability used successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to use ability' });
    }
  }

  async getAvailableAbilities(req: Request, res: Response): Promise<void> {
    try {
      const { monsterId } = req.params;
      const abilities = await this.abilityService.getAvailableAbilities(monsterId);
      res.json(abilities);
    } catch (error) {
      res.status(500).json({ error: 'Failed to get available abilities' });
    }
  }

  async getAbilityCooldown(req: Request, res: Response): Promise<void> {
    try {
      const { monsterId, abilityId } = req.params;
      const monster = await this.abilityService['monsterService'].getMonsterById(monsterId);
      
      if (!monster) {
        res.status(404).json({ error: 'Monster not found' });
        return;
      }

      const cooldownRemaining = this.abilityService.getAbilityCooldownRemaining(monster, abilityId);
      res.json({ cooldownRemaining });
    } catch (error) {
      res.status(500).json({ error: 'Failed to get ability cooldown' });
    }
  }

  async regenerateEnergy(req: Request, res: Response): Promise<void> {
    try {
      const { monsterId } = req.params;
      await this.abilityService.regenerateEnergy(monsterId);
      res.json({ message: 'Energy regenerated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to regenerate energy' });
    }
  }

  async getActiveStatusEffects(req: Request, res: Response): Promise<void> {
    try {
      const { monsterId } = req.params;
      const monster = await this.abilityService['monsterService'].getMonsterById(monsterId);
      
      if (!monster) {
        res.status(404).json({ error: 'Monster not found' });
        return;
      }

      // Process status effects before returning them
      await this.abilityService.processStatusEffects(monsterId);
      
      res.json({
        activeEffects: monster.activeStatusEffects,
        stats: monster.stats
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to get active status effects' });
    }
  }
} 