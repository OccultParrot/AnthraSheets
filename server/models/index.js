import User from "./user.model.js";
import Directory from "./directory.model.js";
import Sheet from "./sheet.model.js";
import Tag from "./tag.model.js";
import SheetTag from "./sheet-tag.model.js";

User.hasMany(Directory, { foreignKey: 'user_id', as: 'directories' });
Directory.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

Directory.hasMany(Sheet, { foreignKey: 'directory_id', as: 'sheets' });
Sheet.belongsTo(Directory, { foreignKey: 'directory_id', as: 'directory' });

User.hasMany(Tag, { foreignKey: 'created_by', as: 'tags' });
Tag.belongsTo(User, { foreignKey: 'created_by', as: 'creator' });

Sheet.belongsToMany(Tag, { through: SheetTag, foreignKey: 'sheet_id', otherKey: 'tag_id', as: 'tags' });
Tag.belongsToMany(Sheet, { through: SheetTag, foreignKey: 'tag_id', otherKey: 'sheet_id', as: 'sheets' });

export { User, Directory, Sheet, Tag, SheetTag };