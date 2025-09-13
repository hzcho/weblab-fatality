import Event from './event';
import User from './user';
import EventParticipant from './eventParticipant';

Event.belongsTo(User, { foreignKey: 'createdBy', as: 'user' });
User.hasMany(Event, { foreignKey: 'createdBy', as: 'events' });

User.belongsToMany(Event, {
  through: EventParticipant,
  foreignKey: 'userId',
  as: 'participatedEvents',
});
Event.belongsToMany(User, {
  through: EventParticipant,
  foreignKey: 'eventId',
  as: 'participants',
});

export { Event, User, EventParticipant };
