import cors from 'cors';
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { connectDB } from './config/database.js';
import { config } from './config/index.js';
import { errorHandler } from './middleware/errorHandler.js';
import abilityRoutes from './routes/abilityRoutes.js';
import authRoutes from './routes/auth.js';
import battleRoutes from './routes/battle.routes.js';
import breedingRoutes from './routes/breeding.routes.js';
import monsterRoutes from './routes/monsterRoutes.js';
import { BattleRoomManager } from './websocket/BattleRoomManager.js';
import { BattleServer, BattleSocket, ClientToServerEvents, InterServerEvents, ServerToClientEvents, SocketData } from './websocket/types.js';

// Initialize Express app
const app = express();
const httpServer = createServer(app);

// Initialize Socket.IO with production-ready config
const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(httpServer, {
  cors: {
    origin: config.frontendUrl || '*',
    methods: ['GET', 'POST'],
    credentials: true
  },
  transports: ['websocket', 'polling']
});

// Configure CORS
const corsOptions = {
  origin: config.frontendUrl || '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Basic health check route
app.get('/health', async (req, res) => {
  try {
    // Check if database is connected
    await connectDB();
    
    res.json({ 
      status: 'ok', 
      message: 'YouGene API is running',
      environment: config.nodeEnv,
      timestamp: new Date().toISOString(),
      database: 'connected'
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Health check failed',
      error: error instanceof Error ? error.message : 'Unknown error',
      database: 'disconnected'
    });
  }
});

// Share io instance with routes
app.set('io', io);

// API Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/monsters', monsterRoutes);
app.use('/api/v1/battles', battleRoutes);
app.use('/api/v1/breeding', breedingRoutes);
app.use('/api/v1/abilities', abilityRoutes);

// Initialize battle room manager
const battleManager = new BattleRoomManager(io);

// Socket.IO connection handling
io.on('connection', (socket: BattleSocket) => {
  console.log('Client connected:', socket.id);

  // Authentication middleware
  socket.use((packet, next) => {
    const [event, data] = packet;
    if (event === 'joinBattle') {
      // TODO: Implement proper authentication
      socket.data.userId = 'temp-user-id';
      next();
    } else {
      next();
    }
  });

  // Battle events
  socket.on('joinBattle', (battleId: string) => {
    // TODO: Get player info from database
    const playerInfo = {
      id: socket.id,
      userId: socket.data.userId,
      monster: {
        id: 'temp-monster-id',
        monsterId: 'temp-monster-id',
        name: 'Test Monster',
        type: 'Fire',
        stats: {
          health: 100,
          maxHealth: 100,
          energy: 100,
          maxEnergy: 100,
          attack: 10,
          defense: 10,
          speed: 10
        },
        position: { x: 0, y: 0 },
        statusEffects: [],
        abilityCooldowns: {}
      },
      ready: false
    };

    battleManager.joinBattle(battleId, socket, playerInfo);
  });

  socket.on('leaveBattle', (battleId: string) => {
    battleManager.leaveBattle(battleId, socket);
  });

  socket.on('ready', (battleId: string) => {
    battleManager.setPlayerReady(battleId, socket);
  });

  socket.on('useAbility', (data) => {
    const battleId = socket.data.battleId;
    if (!battleId) {
      socket.emit('error', 'Not in a battle');
      return;
    }

    // TODO: Implement ability usage logic
    socket.to(battleId).emit('abilityUsed', data);
  });

  socket.on('moveMonster', (data) => {
    const battleId = socket.data.battleId;
    if (!battleId) {
      socket.emit('error', 'Not in a battle');
      return;
    }

    battleManager.updateMonsterPosition(battleId, data.monsterId, data.position);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
    if (socket.data.battleId) {
      battleManager.leaveBattle(socket.data.battleId, socket);
    }
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
    // Connect to database first
    await connectDB();
    
    const port = process.env.PORT || 3000;
    httpServer.listen(port, () => {
      console.log(`Server is running on port ${port}`);
      console.log(`Environment: ${config.nodeEnv}`);
      console.log(`Frontend URL: ${config.frontendUrl}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Start the server
startServer(); 