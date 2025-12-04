const express =require('express');
const router = express.Router();
const adminUserData = require('../model/adminModel');
router.get('/', async (req, res) => {
    try {
        const adminUser = await adminUserData.find();
        res.status(200).send(adminUser);
    } catch (error) {
        console.error(`Data fetcing error: ${error}`);
        res.status(500).send("Internal Server Error");
    }
});

router.post('/', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).send("All fields are required");
        }
    const newAdminUser = new adminUserData({ username, email, password });
        await newAdminUser.save();
        res.status(201).send("Admin data Added successfully", newAdminUser);
    } catch (error) {
        console.error(`Data submission error: ${error}`);
        res.status(500).send("Internal Server Error");
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).send("All fields are required");
        }
    const newAdminUser = new adminUserData({ username, email, password });
        await newAdminUser.save();
        res.status(201).send("Admin data Added successfully");
    } catch (error) {
        console.error(`Data submission error: ${error}`);
        res.status(500).send("Internal Server Error");
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).send("All fields are required");
        }
    const newAdminUser = new adminUserData({ username, email, password });
        await newAdminUser.save();
        res.status(201).send("Admin data Added successfully");
    } catch (error) {
        console.error(`Data submission error: ${error}`);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router;