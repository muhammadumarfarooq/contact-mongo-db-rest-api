import express from "express";
import {getUser, loginUser, registerUser} from "../controllers/user.controller";
import {handleError} from "../errors";
import {userAuthentication} from "../middlewares";
import {AuthenticatedRequest} from "../types";

const router = express.Router();

router.post('/register', async (req, res) => {
   try {
      const result = await registerUser(req.body);
      return res.json(result);
   } catch (err){
      const {status, data} = handleError(err);
      return res.status(status).send(data);
   }
});
router.post('/login', async (req, res) => {
   try {
      const result = await loginUser(req.body);
      return res.json({accessToken: result});
   } catch (err){
      const {status, data} = handleError(err);
      return res.status(status).send(data);
   }
});
router.get('/current-user', userAuthentication, async (req: AuthenticatedRequest, res) => {
   try {
      const user = await getUser(req.user.id);
      return res.json(user);
   } catch (err) {
      const {status, data} = handleError(err);
      return res.status(status).send(data);
   }
});

export default router;

