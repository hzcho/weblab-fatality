import { Router } from 'express';
import EventController from '@controllers/eventController.js';

const router = Router();

router.get('/', EventController.getAllEvents);
router.get('/user/:id', EventController.getUserEvents)
router.get('/:id', EventController.getEventById);
router.post('/', EventController.createEvent);
router.put('/:id', EventController.updateEvent);
router.delete('/:id', EventController.deleteEvent);

router.post('/:id/participate', EventController.participateInEvent);
router.get('/:id/participants', EventController.getEventParticipants);

export default router;
