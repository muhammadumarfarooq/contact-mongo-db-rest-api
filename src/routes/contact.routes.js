const express = require('express');
const router = express.Router();

router.get('/contacts', (req, res) => {
    res.status(200).json({message: 'Message will go here...'});
});

module.exports = router;