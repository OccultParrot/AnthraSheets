import { DataTypes, Model } from "sequelize";
import sequelize from "../config/connection.js"
import DirectoryModel from "./directory.model.js"
class Sheet extends Model { }

Sheet.init(
  {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    directory_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: DirectoryModel,
        key: 'id'
      },
      onDelete: 'CASCADE',
    },
    name: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT
    },
    image_hrefs: {
      type: DataTypes.JSONB,
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
    modelName: 'Sheet',
    tableName: 'sheets',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);


