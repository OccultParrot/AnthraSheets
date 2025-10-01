import {DataTypes, Model} from "sequelize";
import sequelize from "../config/connection.js";
import User from "./user.model.js";

class Tag extends Model {
}

Tag.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING(200),
            allowNull: false,
            unique: true,
        },
        color: {
            type: DataTypes.STRING(7),
            validate: {
                is: /^#[0-9A-Fa-f]{6}$/
            }
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        created_by: {
            type: DataTypes.BIGINT,
            allowNull: false,
            references: {
                model: User,
                key: 'discord_id'
            },
        },
    },
    {
        sequelize,
        modelName: 'Tag',
        tableName: 'tags',
        timestamps: false,
    }
);

export default Tag;