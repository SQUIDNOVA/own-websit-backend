const express = require('express');
const cors = require('cors');
const createDB = require('./config/db');
const analyticsMiddleware = require('./middleware/analytics');
const { performanceMiddleware } = require('./middleware/speed-insights');
const route = require('./Route/route');

const app = express();

app.use(express.json());
app.use(cors());

// Middlewares
app.use(analyticsMiddleware);
app.use(performanceMiddleware);

// IMPORTANT:
// Do NOT call createDB() here.
// Serverless cannot connect on cold start.

app.use(async (req, res, next) => {
  try {
    await createDB();   // Connect DB before route runs
    next();
  } catch (err) {
    console.error("DB connection error:", err);
    return res.status(500).json({ error: "Database connection failed" });
  }
});

// Routes
app.use('/', route);

// Export for Vercel
module.exports = app;
