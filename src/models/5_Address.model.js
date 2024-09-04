import { Model, DataTypes } from "sequelize";
import sequelize from "../db/sequelize.js";

class Address extends Model {}

Address.init({
    id_address: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_user: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false
    },
    neighborhood: {
        type: DataTypes.STRING,
        allowNull: false
    }
    }, {
    sequelize,
    timestamps: true,
    modelName: "Address",
    tableName: "Addresses"
});

export default Address;
