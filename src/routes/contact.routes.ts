import {handleError} from "../errors";

const express = require('express');
import {getContacts, createContact, getContact, updateContact, deleteContact} from "../controllers/contact.controller";
const router = express.Router();

router.get('/contacts', async (req, res) => {
    try {
        const result = await getContacts();
        return res.json(result);
    }catch (err){
        const {status, data} = handleError(err);
        return res.status(status).send(data);
    }
});

router.post('/contacts', async (req, res) => {
    try{
        const result = await createContact(req.body);
        return res.json(result);
    }catch (err) {
        const {status, data} = handleError(err);
        return res.status(status).send(data);
    }
});

router.get('/contacts/:id', async (req, res) => {
    try{
        const result = await getContact(req.params.id);
        return res.json(result);
    }catch(err){
        const {status, data} = handleError(err);
        return res.status(status).send(data);
    }
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