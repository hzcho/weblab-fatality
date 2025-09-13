import { DataTypes, Model } from 'sequelize';
import { sequelize } from '@config/db';
import Event from '@models/event';
import User from '@models/user';

class EventParticipant extends Model {
  public id!: string;
  public userId!: string;
  public eventId!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

EventParticipant.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
    eventId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Event,
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'eventParticipant',
    timestamps: true,
  },
);

export default EventParticipant;
