const { track } = require('@vercel/analytics/server');

/**
 * Vercel Web Analytics Middleware for Express
 * Tracks API requests with server-side analytics
 * 
 * This middleware automatically tracks page views and custom events
 * for all routes in the Express application.
 */
const analyticsMiddleware = (req, res, next) => {
    // Store the original send function
    const originalSend = res.send;
    
    // Override the send function to track after response
    res.send = function(data) {
        // Restore original send
        res.send = originalSend;
        
        // Track the request asynchronously (non-blocking)
        // Only track in production environment when VERCEL_URL is available
        if (process.env.VERCEL_URL || process.env.NODE_ENV === 'production') {
            track('api_request', {
                path: req.path,
                method: req.method,
                status: res.statusCode,
                route: req.route ? req.route.path : req.path
            }, {
                request: req
            }).catch(err => {
                // Silently fail in production, log in development
                if (process.env.NODE_ENV !== 'production') {
                    console.log('[Analytics] Track error:', err.message);
                }
            });
        }
        
        // Send the response
        return originalSend.call(this, data);
    };
    
    next();
};

module.exports = analyticsMiddleware;
