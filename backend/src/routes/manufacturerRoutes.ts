// supply-chain-management/backend/src/routes/manufacturerRoutes.ts
import { Router } from 'express';
import { getOrders, placeOrder, makePayment } from '../controllers/manufacturerController';
import authMiddleware from '../middleware/auth';

const router = Router();

router.get('/orders', authMiddleware, getOrders);
router.post('/placeOrder', authMiddleware, placeOrder);
router.post('/makePayment', authMiddleware, makePayment);

export default router;