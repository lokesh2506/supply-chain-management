import { Router } from 'express';
import { getAircrafts } from '../controllers/airlineController';
import authMiddleware from '../middleware/auth';

const router = Router();

router.get('/aircrafts', authMiddleware, getAircrafts);

export default router;