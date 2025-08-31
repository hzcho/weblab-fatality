import { Router } from 'express';
import ProfileController from '@controllers/profileController';

const router = Router();

router.get('/getCurrentUser', ProfileController.getCurrentUser);

export default router;
