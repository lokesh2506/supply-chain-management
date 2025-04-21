import express from 'express';
import { getMaterials, getOrders, getDeliveries, getTransactions, addMaterial } from '../controllers/supplierController';
import authMiddleware from '../middleware/auth';

const router = express.Router();

router.get('/materials', authMiddleware, getMaterials);
router.post('/materials', authMiddleware, addMaterial); // Retain POST for adding materials
router.get('/orders', authMiddleware, getOrders);
router.get('/deliveries', authMiddleware, getDeliveries);
router.get('/transactions', authMiddleware, getTransactions);

export default router;