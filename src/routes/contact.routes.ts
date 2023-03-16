import express from 'express';

import {handleError} from "../errors";
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

router.put('/contacts/:id', async (req, res) => {
    try{
        const result = await updateContact(req.params.id, req.body);
        return res.json(result);
    }catch(err){
        const {status, data} = handleError(err);
        return res.status(status).send(data);
    }
});

router.delete('/contacts/:id', async (req, res) => {
    try{
        const result = await deleteContact(req.params.id);
        return res.json(result);
    }catch(err){
        const {status, data} = handleError(err);
        return res.status(status).send(data);
    }
});


export default router;