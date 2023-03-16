import express from "express";
import {registerUser} from "../controllers/user.controller";
import {handleError} from "../errors";

const router = express.Router();

router.post('/register', async (req, res) => {
   try {
      const result = await registerUser(req.body);
      return res.json(result);
   }catch (err){
      const {status, data} = handleError(err);
      return res.status(status).send(data);
   }
});
router.post('/login', (req, res) => {
   res.json({message: 'Login user....'});
});
router.get('/current-user', (req, res) => {
   res.json({message: 'Current user....'});
});

export default router;

