import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { store } from '../store';
import { logout } from '../store/slices/authSlice';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add a request interceptor to add the auth token
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = store.getState().auth.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: unknown) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: unknown) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      store.dispatch(logout());
    }
    return Promise.reject(error);
  }
);

// Auth endpoints
export const authAPI = {
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),
  register: (username: string, email: string, password: string) =>
    api.post('/auth/register', { username, email, password }),
  logout: () => api.post('/auth/logout'),
  getProfile: () => api.get('/auth/profile'),
  updateProfile: (data: any) => api.put('/auth/profile', data)
};

// Monster endpoints
export const monsterAPI = {
  getCollection: () => api.get('/monsters/collection'),
  getMonster: (id: string) => api.get(`/monsters/${id}`),
  createMonster: (data: any) => api.post('/monsters', data),
  updateMonster: (id: string, data: any) => api.put(`/monsters/${id}`, data),
  deleteMonster: (id: string) => api.delete(`/monsters/${id}`),
  fuseMonsters: (parent1Id: string, parent2Id: string) =>
    api.post('/monsters/fuse', { parent1Id, parent2Id })
};

// Battle endpoints
export const battleAPI = {
  startBattle: (monsterId: string) => api.post('/battles', { monsterId }),
  getBattle: (id: string) => api.get(`/battles/${id}`),
  endBattle: (id: string, result: 'win' | 'loss' | 'draw') =>
    api.put(`/battles/${id}`, { result }),
  getBattleHistory: () => api.get('/battles/history')
};

// Market endpoints
export const marketAPI = {
  getListings: () => api.get('/market/listings'),
  createListing: (monsterId: string, price: number) =>
    api.post('/market/listings', { monsterId, price }),
  purchaseListing: (listingId: string) =>
    api.post(`/market/listings/${listingId}/purchase`),
  cancelListing: (listingId: string) =>
    api.delete(`/market/listings/${listingId}`)
};

export default api; 