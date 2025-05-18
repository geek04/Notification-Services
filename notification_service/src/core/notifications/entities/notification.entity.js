import { DataTypes } from 'sequelize';

export const NotificationModel = (sequelize) => {
  return sequelize.define('Notification', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    channel: {
      type: DataTypes.ENUM('EMAIL', 'SMS', 'IN_APP'),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('PENDING', 'SENT', 'FAILED'),
      defaultValue: 'PENDING',
    },
    payload: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    retries: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  }, {
    paranoid: true,
    indexes: [
      { fields: ['userId'] },
      { fields: ['createdAt'] },
    ]
  });
};