import { Model, DataTypes } from "sequelize";
import sequelize from "../db/sequelize.js";

class RolPermissions extends Model {}
RolPermissions.init({}, { sequelize, timestamps: false });

export default RolPermissions;