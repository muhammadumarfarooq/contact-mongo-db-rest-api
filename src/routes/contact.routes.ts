import express from 'express';

import {handleError} from "../errors";
import {getContacts, createContact, getContact, updateContact, deleteContact} from "../controllers/contact.controller";
import {userAuthentication} from "../middlewares";
import {AuthenticatedRequest} from "../types";
const router = express.Router();

router.use(userAuthentication);
router.get('/contacts', async (req: AuthenticatedRequest, res) => {
    try {
        const result = await getContacts(req.user.id);
        return res.json(result);
    }catch (err){
        const {status, data} = handleError(err);
        return res.status(status).send(data);
    }
});

router.post('/contacts', async (req: AuthenticatedRequest, res) => {
    try{
        const result = await createContact(req.user.id, req.body);
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

router.put('/contacts/:id', async (req: AuthenticatedRequest, res) => {
    try{
        const result = await updateContact(req.user.id, req.params.id, req.body);
        return res.json(result);
    }catch(err){
        const {status, data} = handleError(err);
        return res.status(status).send(data);
    }
});

router.delete('/contacts/:id', async (req: AuthenticatedRequest, res) => {
    try{
        const result = await deleteContact(req.user.id, req.params.id);
        return res.json(result);
    }catch(err){
        const {status, data} = handleError(err);
        return res.status(status).send(data);
    }
});

export default router;