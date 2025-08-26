import { Router } from 'express';
import userRoutes from './userRoutes.js';
import eventRoutes from './eventRoutes.js';

const router = Router();

router.use('/events', eventRoutes); 
router.use('/users', userRoutes);
export default router;