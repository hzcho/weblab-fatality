import User from '@models/user';
import Event from '@models/event';
import { NotFoundError, BadRequestError } from '@utils/errors';
import { InferCreationAttributes } from 'sequelize';
import EventParticipant from '@models/eventParticipant';

export type CreateEventDTO = {
  title: string;
  description?: string;
  date: Date;   
  location: string;
  createdBy: string;
};

class EventService {
  async createEvent(eventData: CreateEventDTO): Promise<Event> {
    const { createdBy } = eventData;

    const user = await User.findByPk(createdBy);
    if (!user) {
      throw new NotFoundError('Пользователь не найден');
    }

    return await Event.create(eventData);
  }

  async getAllEvents(): Promise<Event[]> {
    return await Event.findAll();
  }

  async getEventsByUserId(userId: string): Promise<Event[]> {
    return await Event.findAll({
      where: { createdBy: userId },
    });
  }

  async getEventById(id: string): Promise<Event | null> {
    return await Event.findByPk(id);
  }

  async updateEvent(
    id: string,
    eventData: InferCreationAttributes<Event>,
  ): Promise<Event> {
    const event = await Event.findByPk(id);
    if (!event) {
      throw new NotFoundError('Мероприятие не найдено');
    }

    if (eventData.createdBy) {
      const userExists = await User.findByPk(eventData.createdBy);
      if (!userExists) {
        throw new NotFoundError('Пользователь не найден');
      }
    }

    return await event.update(eventData);
  }

  async deleteEvent(id: string): Promise<{ message: string }> {
    const event = await Event.findByPk(id);
    if (!event) {
      throw new NotFoundError('Мероприятие не найдено');
    }

    await event.destroy();

    return { message: 'Мероприятие удалено' };
  }

  async participateInEvent(userId: string, eventId: string) {
    const event = await Event.findByPk(eventId);
    if (!event) {
      throw new NotFoundError('Мероприятие не найдено');
    }

    if (event.createdBy === userId) {
      throw new BadRequestError('Нельзя участвовать в своём мероприятии');
    }

    const already = await EventParticipant.findOne({ where: { userId, eventId } });
    if (already) {
      throw new BadRequestError('Вы уже участвуете в этом мероприятии');
    }

    await EventParticipant.create({ userId, eventId });

    const user = await User.findByPk(userId, {
      attributes: ['id', 'name', 'email'],
    });

    return user;
  }

  async getEventParticipants(eventId: string) {
    const event = await Event.findByPk(eventId, {
      include: [{
        model: User,
        as: 'participants',
        attributes: ['id', 'name', 'email']
      }],
    });

    if (!event) {
      throw new NotFoundError('Мероприятие не найдено');
    }

    return event.participants;
  }
}

export default new EventService();
