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

// Vercel Speed Insights Configuration
// NOTE: Speed Insights is a CLIENT-SIDE tool that measures real user performance in the browser.
// This backend API cannot use Speed Insights directly. Instead, integrate it in your frontend:
// - For HTML: Add <script defer src="/_vercel/speed-insights/script.js"></script>
// - For React/Next.js: Use @vercel/speed-insights package
// See middleware/speed-insights.js for detailed integration instructions.
//
// For backend performance monitoring, we provide a performance middleware:
const { performanceMiddleware } = require('./middleware/speed-insights');
app.use(performanceMiddleware);

const route = require('./Route/route');
const PORT = 3000;

app.use('/', route);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});