const express = require('express');
const serviceRoute = require('./serviceRoute');
const contactRoute = require('./contactRoute');
const adminRoute = require('./adminRoute');
const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Backend API is working",
    time: new Date()
  });
});
router.use('/service', serviceRoute);
router.use('/contact', contactRoute);
router.use('/admin', adminRoute);

module.exports = router;