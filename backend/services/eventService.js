import User from "../models/user.js"
import Event from "../models/event.js";
import { NotFoundError } from "../utils/errors.js";

class EventService{
    async createEvent(eventData) {
        const { createdBy } = eventData;

        const user = await User.findByPk(createdBy);
        if (!user) {
            throw new NotFoundError('Пользователь не найден');
        }

        return await Event.create(eventData);
    }

    async getAllEvents(){
        return await Event.findAll({ include: User });
    }

    async getEventById(){
        return await Event.findByPk()
    }

    async updateEvent(id, eventData) {
        const event = await Event.findByPk(id);
        if (!event) {
            throw new NotFoundError("Мероприятие не найдено");
        }

        if (eventData.createdBy) {
            const userExists = await User.findByPk(eventData.createdBy);
            if (!userExists) {
                throw new NotFoundError("Пользователь не найден");
            }
        }

        return await Event.update(id, eventData);
  }

  async deleteEvent(id) {
    const event = await Event.findByPk(id);
    if (!event) {
      throw new NotFoundError("Мероприятие не найдено");
    }

    await event.destroy();

    return { message: "Мероприятие удалено" };
  }
}

export default new EventService();