import { Request, Response } from 'express';
import { BreedingService } from '../services/BreedingService.js';
import { MonsterService } from '../services/MonsterService.js';

export class MonsterController {
  private monsterService: MonsterService;
  private breedingService: BreedingService;

  constructor() {
    this.monsterService = new MonsterService();
    this.breedingService = new BreedingService();
  }

  async createMonster(req: Request, res: Response): Promise<void> {
    try {
      const monster = await this.monsterService.createMonster(req.body);
      res.status(201).json(monster);
    } catch (error) {
      res.status(400).json({ message: 'Error creating monster', error });
    }
  }

  async getAllMonsters(req: Request, res: Response): Promise<void> {
    try {
      const monsters = await this.monsterService.getAllMonsters();
      res.status(200).json(monsters);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching monsters', error });
    }
  }

  async getMonsterById(req: Request, res: Response): Promise<void> {
    try {
      const monster = await this.monsterService.getMonsterById(req.params.id);
      if (!monster) {
        res.status(404).json({ message: 'Monster not found' });
        return;
      }
      res.status(200).json(monster);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching monster', error });
    }
  }

  async updateMonster(req: Request, res: Response): Promise<void> {
    try {
      const monster = await this.monsterService.updateMonster(req.params.id, req.body);
      if (!monster) {
        res.status(404).json({ message: 'Monster not found' });
        return;
      }
      res.status(200).json(monster);
    } catch (error) {
      res.status(400).json({ message: 'Error updating monster', error });
    }
  }

  async deleteMonster(req: Request, res: Response): Promise<void> {
    try {
      const monster = await this.monsterService.deleteMonster(req.params.id);
      if (!monster) {
        res.status(404).json({ message: 'Monster not found' });
        return;
      }
      res.status(200).json({ message: 'Monster deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting monster', error });
    }
  }

  async breedMonsters(req: Request, res: Response): Promise<void> {
    try {
      const { parent1Id, parent2Id } = req.body;

      if (!parent1Id || !parent2Id) {
        res.status(400).json({ message: 'Both parent IDs are required' });
        return;
      }

      const offspring = await this.breedingService.breedMonsters(parent1Id, parent2Id);
      res.status(201).json(offspring);
    } catch (error) {
      res.status(400).json({ message: 'Error breeding monsters', error });
    }
  }
} 