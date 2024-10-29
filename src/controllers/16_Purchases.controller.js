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
}

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
    const {id_product, id_user, purchase_date, quantity, unit_price, total_price} = req.body;
    try {
        const createdPurchase = await Purchases.create({id_product, id_user, purchase_date, quantity, unit_price, total_price, status: true});
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

export const denyPurchaseById = async(req, res) => {
    const {id} = req.params;
    try {
        const denniedPurchase = await Purchases.update({status : false}, {where : {id_purchase : id}});
        let isDennied;
        denniedPurchase <= 0 ? (isDennied = false) : (isDennied = true);
        res.status(201).json({
            ok : true,
            status : 201,
            body : {
                denniedPurchase,
                isDennied
            }
        });
    }  catch(err) {
        res.status(400).json({
            ok : false,
            status : 400,
            err
        });
    };
};