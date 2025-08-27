import {DataTypes} from "sequelize";
import {sequelize} from "../../config/db.js";
import { hash } from 'bcryptjs';

const User =sequelize.define("user", {
    id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey:true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false, 
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
        isEmail: true,
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
  timestamps: true,
  hooks: {
    beforeCreate: async (user) => {
      const hashedPassword = await hash(user.password, 10);
      user.password = hashedPassword;
    },
  },
});

export default User;