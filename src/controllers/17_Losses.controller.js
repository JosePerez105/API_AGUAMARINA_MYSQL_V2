import Losses from '../models/17_Loss.model.js';
import Product from '../models/7_Product.model.js';

export const getLosses = async(req, res) => {
    const losses = await Losses.findAll();
    try {
        res.status(200).json({
            ok : true,
            status : 200,
            body : losses
        });
    } catch(err) {
        res.status(400).json({
            ok : false,
            status : 400,
            err
        });
    };
}

export const getLossById = async(req, res) => {
    const {id} = req.params;
    try {
        const losses = await Loss.findByPk(id);
        res.status(200).json({
            ok : true,
            status : 200,
            body : losses
        });
    } catch(err) {
        res.status(400).json({
            ok : false,
            status : 400,
            err
        });
    };
};

export const getLossesByUser = async(req, res) => {
    const {id} = req.params;
    try {
        const losses = await Losses.findAll({where : {id_user : id}});
        res.status(200).json({
            ok : true,
            status : 200,
            body : losses
        });
    } catch(err) {
        res.status(400).json({
            ok : false,
            status : 400,
            err
        });
    };
};

export const getLossesByProduct = async(req, res) => {
    const {id} = req.params;
    try {
        const losses = await Losses.findAll({where : {id_product : id}});
        res.status(200).json({
            ok : true,
            status : 200,
            body : losses
        });
    } catch(err) {
        res.status(400).json({
            ok : false,
            status : 400,
            err
        });
    };
};

export const createLoss = async(req, res) => {
    const {id_product, id_user, loss_date, quantity, observations} = req.body;
    try {
        const product = await Product.findByPk(id_product);
        if (product) {
            const createdLoss = await Losses.create({id_product, id_user, loss_date, quantity, observations, status: true});
            
            product.total_quantity -= quantity;
            await product.save();

            res.status(201).json({
                ok : true,
                status : 201,
                message : "Created Loss",
                body : createdLoss
            });
            return;
        }
        

        res.status(400).json({
            ok : false,
            status : 400,
            message : "No se ha encontrado un producto con ese ID para registrar la pérdida",
            body : []
        });
        
        
    } catch(err) {
        res.status(400).json({
            ok : false,
            status : 400,
            err
        });
    };
};

export const denyLossById = async(req, res) => {
    const {id} = req.params;
    try {
        const loss = await Losses.findByPk(id);

        if (loss.status == false) {
            res.status(400).json({
                ok : false,
                status : 400,
                message : "Esta pérdida ya se encuentra denegada",
                body : {
                    loss,
                    isDennied : false
                }
            });
            return;
        }

        const product = await Product.findByPk(loss.id_product);
        loss.status = false;
        await loss.save();
        product.total_quantity += loss.quantity;
        await product.save();
        let isDennied = true

        res.status(201).json({
            ok : true,
            status : 201,
            message : "Pérdida denegada correctamente",
            body : {
                loss,
                isDennied
            }
        });
    }  catch(err) {
        res.status(400).json({
            ok : false,
            status : 400,
            err : err.message
        });
    };
};