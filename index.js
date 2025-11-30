const express = require('express');
const app = express();
app.use(express.json());
const createDB = require('./config/db');
createDB();
const cors = require('cors');
app.use(cors());
const route = require('./Route/route');
const PORT = 3000;

app.use('/', route);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});