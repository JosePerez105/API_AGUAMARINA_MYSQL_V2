import { Model, DataTypes } from "sequelize";
import sequelize from "../db/sequelize.js";

class Permission extends Model {}

Permission.init({
    id_permission: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING
    }
    }, {
    sequelize,
    timestamps: true,
    modelName: "Permission",
    tableName: "Permissions"
});

export default Permission;