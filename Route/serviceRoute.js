const express =require('express');
const router = express.Router();
const serviceFormData = require('../model/serviceModel');

router.get('/', async (req, res) => {
    try {
        const userReviewData = await serviceFormData.find();
        res.status(200).send(userReviewData);
    } catch (error) {
        console.error(`Data fetcing error: ${error}`);
        res.status(500).send("Internal Server Error");
    }
});

router.post('/', async (req, res) => {
    try {
        const { name, email, message } = req.body;
        if (!name || !email || !message) {
            return res.status(400).send("All fields are required");
        }
        const newFormData = new serviceFormData({ name, email, message });
        await newFormData.save();
        res.status(201).send("Form data submitted successfully");
    } catch (error) {
        console.error(`Data submission error: ${error}`);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router;