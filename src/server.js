const express = require('express');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use('/api/v2', require('./routes/contact.routes'));

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});