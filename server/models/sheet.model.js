import {DataTypes, Model} from "sequelize";
import sequelize from "../config/connection.js";
import Directory from "./directory.model.js";

class Sheet extends Model {
}

Sheet.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        directory_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Directory,
                key: 'id'
            },
            onDelete: 'CASCADE',
        },
        name: {
            type: DataTypes.STRING(200),
        },
        content: {
            type: DataTypes.TEXT,
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

export default Sheet;
