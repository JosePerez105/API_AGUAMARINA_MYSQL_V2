import Roles from "../models/1_Rol.model.js";
import RolPermissions from "../models/3_RolPermissions.model.js";

export const getRoles = async(req, res) => {
    try {
        const roles = await Roles.findAll();
        res.status(200).json({
            ok : true,
            status : 200,
            body : roles
        });
    } catch(err) {
        res.status(400).json({
            ok : false,
            status : 400,
            err
        });
    };
};

export const getRolById = async(req, res) => {
    const {id} = req.params;
    try {
        const rol = await Roles.findByPk(id);
        res.status(200).json({
            ok : true,
            status : 200,
            body : rol
        });
    } catch(err) {
        res.status(400).json({
            ok : false,
            status : 400,
            err
        });
    };
};

export const createRol = async(req, res) => {
    const {name, description, color, permissions = []} = req.body;
    if (permissions.length <= 0) {
        return res.status(400).json({
            ok : false,
            status : 400,
            message : "Sin Permisos",
        });
    }
    try {
        const createdRol = await Roles.create({name, description, color});
        permissions.map(async(per) => await RolPermissions.create({id_rol : createdRol.id_rol, id_permission : per.id_permission}));
        res.status(201).json({
            ok : true,
            status : 201,
            message : "Created Rol",
            body : createdRol
        });
    } catch(err) {
        res.status(200).json({
            ok : false,
            status : 400,
            err,
            permissions
        });
    };
};

export const updateRolById = async(req, res) => {
    const {id} = req.params;
    const {name, description, color} = req.body;
    try {
        const [updatedRol] = await Roles.update({name, description, color}, {where : {id_rol : id}});
        let isUpdated;
        updatedRol <= 0 ? (isUpdated = false) : (isUpdated = true);
        res.status(200).json({
            ok : true,
            status : 200,
            message : "Updated Rol",
            body : {
                affectedRows : updatedRol,
                isUpdated
            }
        });
    } catch(err) {
        res.status(400).json({
            ok : false,
            status : 400,
            err
        });
    }
};

export const deleteRolById = async(req, res) => {
    const {id} = req.params;
    try {
        const deletedRol = await Roles.destroy({where : {id_rol : id}});
        let isDeleted;
        deletedRol <= 0 ? (isDeleted = false) : (isDeleted = true);
        res.status(201).json({
            ok : true,
            status : 204,
            body : {
                deletedRol,
                isDeleted
            }
        });
    } catch(err) {
        res.status(400).json({
            ok : false,
            status : 400,
            err
        });
    }
};