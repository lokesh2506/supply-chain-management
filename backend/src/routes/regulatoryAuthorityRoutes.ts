import { Router } from 'express';
import { issueCertification } from '../controllers/regulatoryAuthorityController';
import authMiddleware from '../middleware/auth';

const router = Router();

router.post('/certifications', authMiddleware, issueCertification);

export default router;