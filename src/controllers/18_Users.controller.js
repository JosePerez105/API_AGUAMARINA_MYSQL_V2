import Users from '../models/18_User.model.js';

export const getUsers = async(req, res) => {
    const users = await Users.findAll();
    try {
        res.status(200).json({
            ok : true,
            status : 200,
            body : users
        });
    } catch(err) {
        res.status(400).json({
            ok : false,
            status : 400,
            err
        });
    };
};

export const getUserById = async(req, res) => {
    const {id} = req.params;
    try {
        const users = await Users.findByPk(id);
        res.status(200).json({
            ok : true,
            status : 200,
            body : users
        });
    } catch(err) {
        res.status(400).json({
            ok : false,
            status : 400,
            err
        });
    };
};

export const getUserByMail = async(req, res) => {
    const {mail} = req.body;
    try {
        const users = await Users.findAll({where : {mail}});
        res.status(200).json({
            ok : true,
            status : 200,
            body : users
        });
    } catch(err) {
        res.status(400).json({
            ok : false,
            status : 400,
            err
        });
    };
};

export const createUser = async(req, res) => {
    const {names, lastnames, dni, mail, password, phone_number, id_rol, status} = req.body;
    try {
        const createdUser = await Users.create({names, lastnames, dni, mail, password, phone_number, id_rol, status});
        res.status(201).json({
            ok : true,
            status : 201,
            message : "Created User",
            body : createdUser
        });
    } catch(err) {
        res.status(400).json({
            ok : false,
            status : 400,
            err
        });
    };
};

export const updateUserById = async(req, res) => {
    const {id} = req.params;
    const {names, lastnames, dni, mail, password, phone_number, id_rol, status} = req.body;
    try {
        const [updatedUser] = await PurchaseDetails.update({names, lastnames, dni, mail, password, phone_number, id_rol, status}, {where : {id_user : id}});
        let isUpdated;
        updatedUser <= 0 ? (isUpdated = false) : (isUpdated = true);
        res.status(200).json({
            ok : true,
            status : 200,
            message : "Updated User",
            body : {
                affectedRows : updatedUser,
                isUpdated
            }
        });
    } catch(err) {
        res.status(400).json({
            ok : false,
            status : 400,
            err
        });
    };
};

/* export const patchUserStatusById = async(req, res) => {
    const {id} = req.params;
    const users = await Users.findByPk(id);
    console.log(users);
    const newStatus = users[0].status == 1 ?  0 : 1;
    try {
        const patchedUser = await Users.update({status : newStatus},{where : {id_user : id}});

    } catch(err) {
        res.status(400).json({
            ok : false,
            status : 400,
            err
        });
    };
}; */

export const deleteUserById = async(req, res) => {
    const {id} = req.params;
    try {
        const deletedUser = await Users.destroy({where : {id_user : id}});
        let isDeleted;
        deletedUser <= 0 ? (isDeleted = false) : (isDeleted = true);
        res.status(201).json({
            ok : true,
            status : 204,
            body : {
                deletedUser,
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

