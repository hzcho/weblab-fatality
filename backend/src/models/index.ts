import Event from '@models/event';
import User from '@models/user';

Event.belongsTo(User, { foreignKey: 'createdBy', as: 'user' });
User.hasMany(Event, { foreignKey: 'createdBy', as: 'event' });
