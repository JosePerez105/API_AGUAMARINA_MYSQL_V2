import { Model, DataTypes } from "sequelize";
import sequelize from "../db/sequelize.js";

class Status extends Model {}

Status.init({
    id_status: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
    }, {
    sequelize,
    timestamps: true,
    modelName: "Status",
    tableName: "Status"
});

export default Status;
