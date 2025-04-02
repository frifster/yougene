import rateLimit from 'express-rate-limit';
import { config } from './index.js';

// General API rate limiter
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  skip: (req) => {
    // Skip rate limiting for health check endpoint and /me endpoint
    return req.path === '/health' || req.path === '/me';
  }
});

// Auth routes rate limiter (stricter)
export const authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // Limit each IP to 5 requests per windowMs
  message: 'Too many login attempts, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => {
    // Skip rate limiting for /me endpoint
    return req.path === '/me';
  }
});

// Battle routes rate limiter
export const battleLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 30, // Limit each IP to 30 requests per windowMs
  message: 'Too many battle requests, please try again later.',
  standardHeaders: true,
  legacyHeaders: false
});

// Breeding routes rate limiter
export const breedingLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // Limit each IP to 10 breeding attempts per hour
  message: 'Too many breeding attempts, please try again later.',
  standardHeaders: true,
  legacyHeaders: false
}); 