import { Router } from 'express';
import { logService } from '../controllers/mroController';
import authMiddleware from '../middleware/auth';

const router = Router();

router.post('/services', authMiddleware, logService);

export default router;