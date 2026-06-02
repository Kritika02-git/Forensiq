import { Router, Response } from 'express';
import {authenticate, AuthRequest} from "../middleware/auth.middleware";
import {sendArgument, startDebate} from "../controllers/debate.controller";

const router = Router();

router.get('/test', (req, res) => {
    res.json({ message: 'debate router works' });
})

router.get('/protected', authenticate,  (req: AuthRequest, res) => {
    res.json({ message: 'You are authenticated!', userId: req.userId });
})

router.post('/start', authenticate,async (req, res) => {
   await  startDebate(req as AuthRequest, res)
})

router.post('/argue', authenticate, async (req, res) => {
    console.log('argue route hit')
    console.log('body:', req.body)
   await sendArgument(req as AuthRequest, res)
})

export default router;