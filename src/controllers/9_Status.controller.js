import Status from '../models/9_Status.model.js'

export const getStatus = async(req, res) => {
    const status = await Status.findAll();
    try {
        res.status(200).json({
            ok : true,
            status : 200,
            body : status
        });
    } catch(err) {
        res.status(400).json({
            ok : false,
            status : 400,
            err
        });
    };
};

export const getStatusById = async(req, res) => {
    const {id} = req.params;
    try {
        const status = await Status.findByPk(id);
        res.status(200).json({
            ok : true,
            status : 200,
            body : status
        });
    } catch(err) {
        res.status(400).json({
            ok : false,
            status : 400,
            err
        });
    };
};

export const createStatus = async(req, res) => {
    const {name} = req.body;
    try {
        const createdStatus = await Status.create({name});
        res.status(201).json({
            ok : true,
            status : 201,
            message : "Created Status",
            body : createdStatus
        });
    } catch(err) {
        res.status(400).json({
            ok : false,
            status : 400,
            err
        });
    };
};

export const updateStatusById = async(req, res) => {
    const {id} = req.params;
    const {name} = req.body;
    try {
        const [updatedStatus] = await Status.update({name}, {where : {id_status : id}});
        let isUpdated;
        updatedStatus <= 0 ? (isUpdated = false) : (isUpdated = true);
        res.status(200).json({
            ok : true,
            status : 200,
            message : "Updated Status",
            body : {
                affectedRows : updatedStatus,
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

export const deleteStatusById = async(req, res) => {
    const {id} = req.params;
    try {
        const deletedStatus = await Status.destroy({where : {id_status : id}});
        let isDeleted;
        deletedStatus <= 0 ? (isDeleted = false) : (isDeleted = true);
        res.status(201).json({
            ok : true,
            status : 204,
            body : {
                deletedStatus,
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