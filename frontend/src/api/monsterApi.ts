import axios from 'axios';
import { Monster } from '../store/slices/monsterSlice';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const monsterApi = {
  // Get all monsters
  getAllMonsters: async (): Promise<Monster[]> => {
    const response = await axios.get(`${API_URL}/monsters`);
    return response.data;
  },

  // Get a specific monster by ID
  getMonsterById: async (id: string): Promise<Monster> => {
    const response = await axios.get(`${API_URL}/monsters/${id}`);
    return response.data;
  },

  // Create a new monster
  createMonster: async (monster: Partial<Monster>): Promise<Monster> => {
    const response = await axios.post(`${API_URL}/monsters`, monster);
    return response.data;
  },

  // Update a monster
  updateMonster: async (id: string, monster: Partial<Monster>): Promise<Monster> => {
    const response = await axios.put(`${API_URL}/monsters/${id}`, monster);
    return response.data;
  },

  // Delete a monster
  deleteMonster: async (id: string): Promise<void> => {
    await axios.delete(`${API_URL}/monsters/${id}`);
  },

  // Breed monsters
  breedMonsters: async (parent1Id: string, parent2Id: string): Promise<Monster> => {
    const response = await axios.post(`${API_URL}/monsters/breed`, {
      parent1Id,
      parent2Id
    });
    return response.data;
  }
}; 