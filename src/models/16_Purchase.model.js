import { Model, DataTypes } from "sequelize";
import sequelize from "../db/sequelize.js";

class Purchase extends Model {}

Purchase.init({
        id_purchase: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        id_user: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        purchase_date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        total_price: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
        }, {
        sequelize,
        timestamps: true,
        modelName: "Purchase",
        tableName: "Purchases"
});

export default Purchase;
