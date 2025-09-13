import { Request, Response } from 'express';
import eventService from '@services/eventService';
import asyncHandler from '@middleware/asyncHandler';
import { BadRequestError } from '@utils/errors';
import { validate as isUUID } from 'uuid';
import User from '@models/user';

class EventController {
  getAllEvents = asyncHandler(async (req: Request, res: Response) => {
    const events = await eventService.getAllEvents();
    res.status(200).json(events);
  });

  getUserEvents = asyncHandler(async (req: Request, res: Response) =>{
    const {id} = req.params
    const events = await eventService.getEventsByUserId(id);
    res.status(200).json(events);
  })

  getEventById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!isUUID(id)) {
      throw new BadRequestError('Некорректный ID');
    }
    const event = await eventService.getEventById(id);
    res.status(200).json(event);
  });

  createEvent = asyncHandler(async (req: Request, res: Response) => {
    const { title, description, date, location } = req.body;

    if (!title || !date || !location) {
      throw new BadRequestError('Все обязательные поля должны быть заполнены');
    }

    const currentUser = req.user as User;
    const createdBy=currentUser.id

    if (!isUUID(createdBy)) {
      throw new BadRequestError('Некорректный UUID пользователя');
    }

    const event = await eventService.createEvent({title, description, date, location, createdBy});
    res.status(201).json(event);
  });

  updateEvent = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const eventData = req.body;

    if (!isUUID(id)) {
      throw new BadRequestError('Некорректный ID');
    }

    const updatedEvent = await eventService.updateEvent(id, eventData);
    res.status(200).json(updatedEvent);
  });

  deleteEvent = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!isUUID(id)) {
      throw new BadRequestError('Некорректный ID');
    }

    const response = await eventService.deleteEvent(id);
    res.status(200).json(response);
  });

  participateInEvent = asyncHandler(async (req: Request, res: Response) => {
    const { id: eventId } = req.params;
    const currentUser = req.user as User;

    const participation = await eventService.participateInEvent(currentUser.id, eventId);
    res.status(201).json(participation);
  });

  getEventParticipants = asyncHandler(async (req: Request, res: Response) => {
    const { id: eventId } = req.params;
    const participants = await eventService.getEventParticipants(eventId);
    res.status(200).json(participants);
  });

}

export default new EventController();
