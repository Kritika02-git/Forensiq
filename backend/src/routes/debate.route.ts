import { Router } from 'express';
import {authenticate, AuthRequest} from "../middleware/auth.middleware";

const router = Router();

router.get('/test', (req, res) => {
    res.json({ message: 'debate router works' });
})

router.get('/protected', authenticate,  (req: AuthRequest, res) => {
    res.json({ message: 'You are authenticated!', userId: req.userId });
})

export default router;