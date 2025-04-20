import { Router } from 'express';
import { getOrders, placeOrder, makePayment } from '../controllers/manufacturerController';
import authMiddleware from '../middleware/auth';

const router = Router();

router.get('/orders', authMiddleware, getOrders);
router.post('/orders', authMiddleware, placeOrder);
router.post('/payments', authMiddleware, makePayment);

export default router;