import Monster, { IMonster } from '../models/Monster.js';

export class MonsterService {
  async createMonster(monsterData: Partial<IMonster>): Promise<IMonster> {
    const monster = new Monster(monsterData);
    return await monster.save();
  }

  async getAllMonsters(): Promise<IMonster[]> {
    return await Monster.find();
  }

  async getMonsterById(id: string): Promise<IMonster | null> {
    return await Monster.findById(id);
  }

  async updateMonster(id: string, monsterData: Partial<IMonster>): Promise<IMonster | null> {
    return await Monster.findByIdAndUpdate(id, monsterData, { new: true });
  }

  async deleteMonster(id: string): Promise<IMonster | null> {
    return await Monster.findByIdAndDelete(id);
  }
} 