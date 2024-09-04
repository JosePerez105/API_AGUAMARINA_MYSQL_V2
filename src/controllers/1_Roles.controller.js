import Roles from "../models/1_Rol.model.js";
import Permissions from "../models/2_Permission.model.js";

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
    const {name, description} = req.body;
    try {
        const createdRol = await Roles.create({name, description});
        res.status(201).json({
            ok : true,
            status : 201,
            message : "Created Rol",
            body : createdRol
        });
    } catch(err) {
        res.status(400).json({
            ok : false,
            status : 400,
            err
        });
    };
};

export const updateRolById = async(req, res) => {
    const {id} = req.params;
    const {name, description} = req.body;
    try {
        const [updatedRol] = await Roles.update({name, description}, {where : {id_rol : id}});
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

export const addPermissions = async(req, res) => {
    const {id_rol, id_permission} = req.body;
    try {
        const rol = await Roles.findByPk(id_rol);
    const permission = await Permissions.findByPk(id_permission);
    await rol.addPermissions(permission);
    } catch(err) {
        res.status(400).json({
            ok : false,
            status : 400,
            err
        });
    };
    
};