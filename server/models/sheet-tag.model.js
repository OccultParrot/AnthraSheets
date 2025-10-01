import { DataTypes, Model } from "sequelize";
import sequelize from "../config/connection.js";
import Sheet from "./sheet.model.js";
import Tag from "./tag.model.js";

class SheetTag extends Model { }

SheetTag.init(
    {
        sheet_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            references: {
                model: Sheet,
                key: 'id'
            },
            onDelete: 'CASCADE',
        },
        tag_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            references: {
                model: Tag,
                key: 'id'
            },
            onDelete: 'CASCADE',
        },
        added_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        sequelize,
        modelName: 'SheetTag',
        tableName: 'sheet_tags',
        timestamps: false,
    }
);

export default SheetTag;