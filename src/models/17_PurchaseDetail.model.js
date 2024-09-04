import { Model, DataTypes } from "sequelize";
import sequelize from "../db/sequelize.js";

class PurchaseDetail extends Model {}

PurchaseDetail.init({
    id_purchasedetail: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_purchase: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_product: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL,
        allowNull: false
    }
    }, {
    sequelize,
    timestamps: true,
    modelName: "PurchaseDetail",
    tableName: "PurchaseDetails"
});

export default PurchaseDetail;
