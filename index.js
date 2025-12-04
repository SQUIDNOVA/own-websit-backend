const express = require('express');
const app = express();
app.use(express.json());
const createDB = require('./config/db');
createDB();
const cors = require('cors');
app.use(cors());

// Vercel Web Analytics - Server-side tracking middleware
const analyticsMiddleware = require('./middleware/analytics');
app.use(analyticsMiddleware);

const route = require('./Route/route');
const PORT = 3000;

app.use('/', route);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});