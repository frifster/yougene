import expressPromBundle from 'express-prom-bundle';
import promClient from 'prom-client';

// Create a metrics registry
const register = new promClient.Registry();

// Add default metrics (CPU, memory, etc.)
promClient.collectDefaultMetrics({ register });

// Custom metrics
const httpRequestDuration = new promClient.Histogram({
  name: 'yougene_http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.1, 0.5, 1, 2, 5]
});

const httpRequestTotal = new promClient.Counter({
  name: 'yougene_http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status_code']
});

const activeWebSocketConnections = new promClient.Gauge({
  name: 'yougene_active_websocket_connections',
  help: 'Number of active WebSocket connections'
});

const battleRoomsActive = new promClient.Gauge({
  name: 'yougene_battle_rooms_active',
  help: 'Number of active battle rooms'
});

const battleActionsTotal = new promClient.Counter({
  name: 'yougene_battle_actions_total',
  help: 'Total number of battle actions',
  labelNames: ['action_type']
});

const errorTotal = new promClient.Counter({
  name: 'yougene_errors_total',
  help: 'Total number of errors',
  labelNames: ['type']
});

// Register all custom metrics
register.registerMetric(httpRequestDuration);
register.registerMetric(httpRequestTotal);
register.registerMetric(activeWebSocketConnections);
register.registerMetric(battleRoomsActive);
register.registerMetric(battleActionsTotal);
register.registerMetric(errorTotal);

// Create middleware for collecting HTTP metrics
const metricsMiddleware = expressPromBundle({
  includeMethod: true,
  includePath: true,
  includeStatusCode: true,
  promRegistry: register
});

// Function to get all metrics
const getMetrics = async () => {
  return await register.metrics();
};

export {
  activeWebSocketConnections, battleActionsTotal, battleRoomsActive, errorTotal, getMetrics, httpRequestDuration,
  httpRequestTotal, metricsMiddleware
};

