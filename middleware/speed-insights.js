/**
 * Vercel Speed Insights Integration Documentation
 * 
 * IMPORTANT: Vercel Speed Insights is a CLIENT-SIDE ONLY performance monitoring tool.
 * It measures real user experience metrics (Core Web Vitals) in the browser.
 * 
 * This backend Express.js API server does not serve HTML pages to browsers, therefore
 * Speed Insights cannot be directly integrated here.
 * 
 * RECOMMENDED INTEGRATION:
 * If you have a frontend application that consumes this API, integrate Speed Insights there:
 * 
 * For plain HTML sites:
 * Add this script tag to your HTML <head>:
 * <script defer src="/_vercel/speed-insights/script.js"></script>
 * 
 * For React/Next.js/Vue/etc:
 * 1. Install: npm install @vercel/speed-insights
 * 2. Import in your app's entry point:
 *    import { injectSpeedInsights } from '@vercel/speed-insights';
 *    injectSpeedInsights();
 * 
 * For Next.js (recommended):
 * import { SpeedInsights } from '@vercel/speed-insights/next';
 * // Add <SpeedInsights /> component to your root layout
 * 
 * For more framework-specific patterns, see:
 * https://vercel.com/docs/speed-insights/quickstart
 * 
 * WHAT TO MONITOR ON THE BACKEND:
 * For backend API performance monitoring, consider:
 * - Vercel Analytics (already integrated in this project via middleware/analytics.js)
 * - Application Performance Monitoring (APM) tools
 * - Custom logging and metrics
 * - Response time tracking
 * - Error rate monitoring
 */

/**
 * Backend Performance Tracking Middleware
 * 
 * This middleware tracks API response times, which is useful for backend performance monitoring.
 * This is complementary to Speed Insights (which should be used on the frontend).
 * 
 * Usage: Add this middleware before your routes in index.js
 */
const performanceMiddleware = (req, res, next) => {
    const startTime = Date.now();
    
    // Store the original end function
    const originalEnd = res.end;
    
    // Override the end function to calculate response time
    res.end = function(...args) {
        const duration = Date.now() - startTime;
        
        // Log performance data (in production, send this to a monitoring service)
        if (process.env.NODE_ENV !== 'production' || process.env.DEBUG_PERFORMANCE) {
            console.log(`[Performance] ${req.method} ${req.path} - ${duration}ms - ${res.statusCode}`);
        }
        
        // Add custom header for response time (useful for debugging)
        res.setHeader('X-Response-Time', `${duration}ms`);
        
        // Restore original end and call it
        return originalEnd.apply(res, args);
    };
    
    next();
};

module.exports = {
    performanceMiddleware,
    /**
     * Documentation helper - this function does nothing on the backend
     * but documents that Speed Insights should be integrated on the frontend
     */
    speedInsightsInfo: () => {
        console.log('\n=== Vercel Speed Insights Integration ===');
        console.log('Speed Insights is a CLIENT-SIDE tool and cannot run on this backend.');
        console.log('To monitor frontend performance, integrate Speed Insights in your frontend app.');
        console.log('Documentation: https://vercel.com/docs/speed-insights/quickstart');
        console.log('=========================================\n');
    }
};
