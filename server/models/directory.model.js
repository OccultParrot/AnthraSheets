import { DataTypes, Model } from "sequelize";
import sequelize from "../config/connection.js";
import UserModel from "./user.model.js"

class Directory extends Model { }

Directory.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: UserModel,
        key: 'discord_id',
      },
      onDelete: 'CASCADE',
    },
    name: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    is_public: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
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
    }
  },
  {
    sequelize,
    modelName: 'Directory',
    tableName: 'directories',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

UserModel.hasMany(Directory, {
  foreignKey: 'user_id',
  sourceKey: 'discord_id',
  as: 'directories'
});

Directory.belongsTo(UserModel, {
  foreignKey: 'user_id',
  targetKey: 'discord_id',
  as: 'user'
});

export default Directory;
