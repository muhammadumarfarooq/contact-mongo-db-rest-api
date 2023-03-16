import express from "express";

const router = express.Router();

router.post('/register', (req, res) => {
   res.json({message: 'Register user....'});
});
router.post('/login', (req, res) => {
   res.json({message: 'Login user....'});
});
router.get('/current-user', (req, res) => {
   res.json({message: 'Current user....'});
});

export default router;

