import cors from 'cors';
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { connectDB } from './config/database.js';
import { config } from './config/index.js';
import { errorHandler } from './middleware/errorHandler.js';
import authRoutes from './routes/auth.js';
import battleRoutes from './routes/battle.routes.js';
import monsterRoutes from './routes/monsterRoutes.js';

// Initialize Express app
const app = express();
const httpServer = createServer(app);

// Initialize Socket.IO
const io = new Server(httpServer, {
  cors: {
    origin: config.frontendUrl,
    methods: ['GET', 'POST']
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Basic health check route
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'You-Gene API is running',
    environment: config.nodeEnv
  });
});

// API Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/monsters', monsterRoutes);
app.use('/api/v1/battles', battleRoutes);

// Monsters route (to be implemented)
app.use('/api/v1/monsters', (req, res) => {
  res.json({ message: 'Monsters route - Coming soon' });
});

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Error handling middleware (should be last)
app.use(errorHandler);

// Handle 404 routes
app.use('*', (req, res) => {
  res.status(404).json({
    status: 'error',
    message: `Can't find ${req.originalUrl} on this server!`
  });
});

// Connect to MongoDB and start server
const startServer = async () => {
  try {
    await connectDB();
    httpServer.listen(config.port, () => {
      console.log(`You-Gene API server running on port ${config.port}`);
      console.log(`Environment: ${config.nodeEnv}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer(); 