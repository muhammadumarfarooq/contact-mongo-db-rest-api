const express = require('express');
require('dotenv').config();

const app = express();

app.get('/api/get-test', (req, res) => {
    res.json({message: 'Some message will go here...'});
});


const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});