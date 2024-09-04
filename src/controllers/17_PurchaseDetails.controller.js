import PurchaseDetails from '../models/17_PurchaseDetail.model.js';

export const getPurchaseDetails = async(req, res) => {
    const details = await PurchaseDetails.findAll();
    try {
        res.status(200).json({
            ok : true,
            status : 200,
            body : details
        });
    } catch(err) {
        res.status(400).json({
            ok : false,
            status : 400,
            err
        });
    };
};

export const getPurchaseDetailById = async(req, res) => {
    const {id} = req.params;
    try {
        const details = await PurchaseDetails.findByPk(id);
        res.status(200).json({
            ok : true,
            status : 200,
            body : details
        });
    } catch(err) {
        res.status(400).json({
            ok : false,
            status : 400,
            err
        });
    };
};

export const getPurchasesDetailsByPurchase = async(req, res) => {
    const {id} = req.params;
    try {
        const details = await PurchaseDetails.findAll({where : {id_purchase : id}});
        res.status(200).json({
            ok : true,
            status : 200,
            body : details
        });
    } catch(err) {
        res.status(400).json({
            ok : false,
            status : 400,
            err
        });
    };
};

export const createPurchaseDetail = async(req, res) => {
    const {id_purchase, id_product, quantity, price} = req.body;
    try {
        const createdDetail = await PurchaseDetails.create({id_purchase, id_product, quantity, price});
        res.status(201).json({
            ok : true,
            status : 201,
            message : "Created Detail",
            body : createdDetail
        });
    } catch(err) {
        res.status(400).json({
            ok : false,
            status : 400,
            err
        });
    };
};

export const updatePurchaseDetailById = async(req, res) => {
    const {id} = req.params;
    const {id_purchase, id_product, quantity, price} = req.body;
    try {
        const [updatedDetail] = await PurchaseDetails.update({id_purchase, id_product, quantity, price}, {where : {id_purchasedetail : id}});
        let isUpdated;
        updatedDetail <= 0 ? (isUpdated = false) : (isUpdated = true);
        res.status(200).json({
            ok : true,
            status : 200,
            message : "Updated Detail",
            body : {
                affectedRows : updatedDetail,
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

export const deletePurchaseDetailById = async(req, res) => {
    const {id} = req.params;
    try {
        const deletedDetail = await PurchaseDetails.destroy({where : {id_purchasedetail : id}});
        let isDeleted;
        deletedDetail <= 0 ? (isDeleted = false) : (isDeleted = true);
        res.status(201).json({
            ok : true,
            status : 204,
            body : {
                deletedDetail,
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