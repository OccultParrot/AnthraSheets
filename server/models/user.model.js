import { DataTypes, Model } from "sequelize";
import sequelize from "../config/connection.js";

class User extends Model {
}

User.init(
  {
    discord_id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    global_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    discriminator: {
      type: DataTypes.STRING(4),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isEmail: true,
      },
    },
    avatar_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    admin_level: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0
      }
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

export default User;