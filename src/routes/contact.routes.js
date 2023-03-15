const express = require('express');
const router = express.Router();

router.get('/contacts', (req, res) => {
    res.status(200).json({message: 'Get contacts'});
});

router.post('/contacts', (req, res) => {
    res.status(200).json({message: 'Create contacts'});
});

router.put('/contacts/:id', (req, res) => {
    res.status(200).json({message: `Update contact with id ${req.params.id}`});
});

router.delete('/contacts/:id', (req, res) => {
    res.status(200).json({message: `Remove contact with id ${req.params.id}`});
});



module.exports = router;