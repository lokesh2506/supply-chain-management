import { Router } from 'express';
import { getMaterials, addMaterial } from '../controllers/supplierController';
import authMiddleware from '../middleware/auth';

const router = Router();

router.get('/materials', authMiddleware, getMaterials);
router.post('/materials', authMiddleware, addMaterial);

export default router;