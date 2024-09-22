import { Model, DataTypes } from "sequelize";
import sequelize from "../db/sequelize.js";

class Reservation extends Model {}

Reservation.init({
    id_reservation: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_user: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    start_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    end_date: {
        type: DataTypes.DATE,
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
    },
    total_reservation: {
        type: DataTypes.DECIMAL,
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: "En Espera"
    }
    }, {
    sequelize,
    timestamps: true,
    modelName: "Reservation",
    tableName: "Reservations"
});

export default Reservation;