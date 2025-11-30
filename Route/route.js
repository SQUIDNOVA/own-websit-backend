const express = require('express');
const serviceRoute = require('./serviceRoute');
const contactRoute = require('./contactRoute');
const router = express.Router();

router.use('/service', serviceRoute);
router.use('/contact', contactRoute);

module.exports = router;