import { Router } from 'express';
import userRoutes from '@routes/userRoutes';
import eventRoutes from '@routes/eventRoutes.js';
import authRoutes from '@routes/authRoutes.js';
import publicRoutes from '@routes/publicRoutes.js';
import authenticateJWT from '@middleware/authMiddleware.js';
import profileRouter from "@routes/profileRoutes"

const router = Router();

router.use('/public', publicRoutes);
router.use('/auth', authRoutes);
router.use('/events', authenticateJWT, eventRoutes);
router.use('/users', authenticateJWT, userRoutes);
router.use('/profile', authenticateJWT, profileRouter);

export default router;
