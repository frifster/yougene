import express from 'express';
import { z } from 'zod';
import { getCurrentUser, login, logout, register } from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Validation schemas
const registerSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

// Routes
router.post('/register', async (req, res, next) => {
  try {
    const validatedData = registerSchema.parse(req.body);
    req.body = validatedData;
    next();
  } catch (error) {
    next(error);
  }
}, register);

router.post('/login', async (req, res, next) => {
  try {
    const validatedData = loginSchema.parse(req.body);
    req.body = validatedData;
    next();
  } catch (error) {
    next(error);
  }
}, login);

// Protected route
router.get('/me', protect, getCurrentUser);

// Logout route
router.post('/logout', protect, logout);

export default router; 