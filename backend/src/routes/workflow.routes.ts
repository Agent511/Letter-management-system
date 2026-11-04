import { Router } from 'express';
import * as ctrl from '../controllers/workflow.controller';

const router = Router();
router.get('/', ctrl.listApprovals);
router.post('/', ctrl.createStep);
router.put('/:id/approve', ctrl.approveStep);

export default router;