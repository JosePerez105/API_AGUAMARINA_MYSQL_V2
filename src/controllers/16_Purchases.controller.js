import Purchases from '../models/16_Purchase.model.js';

export const getPurchases = async(req, res) => {
    const purchases = await Purchases.findAll();
    try {
        res.status(200).json({
            ok : true,
            status : 200,
            body : purchases
        });
    } catch(err) {
        res.status(400).json({
            ok : false,
            status : 400,
            err
        });
    };
};

export const getPurchaseById = async(req, res) => {
    const {id} = req.params;
    try {
        const purchases = await Purchases.findByPk(id);
        res.status(200).json({
            ok : true,
            status : 200,
            body : purchases
        });
    } catch(err) {
        res.status(400).json({
            ok : false,
            status : 400,
            err
        });
    };
};

export const getPurchasesByUser = async(req, res) => {
    const {id} = req.params;
    try {
        const purchases = await Purchases.findAll({where : {id_user : id}});
        res.status(200).json({
            ok : true,
            status : 200,
            body : purchases
        });
    } catch(err) {
        res.status(400).json({
            ok : false,
            status : 400,
            err
        });
    };
};

export const createPurchase = async(req, res) => {
    const {id_user, purchase_date, total_price, status} = req.body;
    try {
        const createdPurchase = await Purchases.create({id_user, purchase_date, total_price, status});
        res.status(201).json({
            ok : true,
            status : 201,
            message : "Created Purchase",
            body : createdPurchase
        });
    } catch(err) {
        res.status(400).json({
            ok : false,
            status : 400,
            err
        });
    };
};

export const updatePurchaseById = async(req, res) => {
    const {id} = req.params;
    const {id_user, purchase_date, total_price, status} = req.body;
    try {
        const [updatedPurchase] = await Purchases.update({id_user, purchase_date, total_price, status}, {where : {id_purchase : id}});
        let isUpdated;
        updatedPurchase <= 0 ? (isUpdated = false) : (isUpdated = true);
        res.status(200).json({
            ok : true,
            status : 200,
            message : "Updated Purchase",
            body : {
                affectedRows : updatedPurchase,
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

export const deletePurchaseById = async(req, res) => {
    const {id} = req.params;
    try {
        const deletedItem = await Purchases.destroy({where : {id_purchase : id}});
        let isDeleted;
        deletedItem <= 0 ? (isDeleted = false) : (isDeleted = true);
        res.status(201).json({
            ok : true,
            status : 204,
            body : {
                deletedItem,
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