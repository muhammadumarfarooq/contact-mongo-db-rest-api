const express = require('express');
import {getContacts, createContact, getContact, updateContact, deleteContact} from "../controllers/contact.controller";
const router = express.Router();

router.get('/contacts', (req, res) => {
    getContacts();
    res.status(200).json({message: 'Get contacts'});
});

router.post('/contacts', (req, res) => {
    console.log(req.body);
    createContact();
    res.status(200).json({message: 'Create contacts'});
});

router.get('/contacts/:id', (req, res) => {
    getContact();
    res.status(200).json({message: `Get contact with id ${req.params.id}`});
});

router.put('/contacts/:id', (req, res) => {
    updateContact();
    res.status(200).json({message: `Update contact with id ${req.params.id}`});
});

router.delete('/contacts/:id', (req, res) => {
    deleteContact();
    res.status(200).json({message: `Remove contact with id ${req.params.id}`});
});


export default router;