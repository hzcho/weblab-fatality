import User from '../models/user';
import Event from '../models/event';
import { NotFoundError } from '../utils/errors';
import { InferCreationAttributes } from 'sequelize';

class EventService {
  async createEvent(eventData: InferCreationAttributes<Event>): Promise<Event> {
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
}

export default new EventService();
