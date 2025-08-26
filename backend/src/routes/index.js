import { Router } from 'express';
import userRoutes from './userRoutes.js';
import eventRoutes from './eventRoutes.js';
import authRoutes from './authRoutes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/events', eventRoutes); 
router.use('/users', userRoutes);
export default router;