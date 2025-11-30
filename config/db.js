const mongoose = require("mongoose");
require('dotenv').config();

const createDB = async () => {
    try {
        await mongoose.connect(process.env.mongoose_link);
        console.log(" MongoDB connected successfully");
    } catch (error) {
        console.error(` Error connecting to MongoDB: ${error}`);
        
    }
};

module.exports = createDB; 