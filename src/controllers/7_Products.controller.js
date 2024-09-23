import Products from '../models/7_Product.model.js'

export const getProducts = async(req, res) => {
    const products = await Products.findAll();
    try {
        res.status(200).json({
            ok : true,
            status : 200,
            body : products
        });
    } catch(err) {
        res.status(400).json({
            ok : false,
            status : 400,
            err
        });
    };
};

export const getProductById = async(req, res) => {
    const {id} = req.params;
    try {
        const products = await Products.findByPk(id);
        res.status(200).json({
            ok : true,
            status : 200,
            body : products
        });
    } catch(err) {
        res.status(400).json({
            ok : false,
            status : 400,
            err
        });
    };
};

export const getProductsByCategory = async(req, res) => {
    const {id} = req.params;
    try {
        const products = await Products.findAll({where : {id_category : id}});
        res.status(200).json({
            ok : true,
            status : 200,
            body : products
        });
    } catch(err) {
        res.status(400).json({
            ok : false,
            status : 400,
            err
        });
    }
};

export const createProduct = async(req, res) => {
    const {name, total_quantity, price, description, id_category, status} = req.body;
    try {
        const createdProduct = await Products.create({name, total_quantity, price, description, id_category, status});
        res.status(201).json({
            ok : true,
            status : 201,
            message : "Created Product",
            body : createdProduct
        });
    } catch(err) {
        res.status(400).json({
            ok : false,
            status : 400,
            err
        });
    };
};

export const updateProductById = async(req, res) => {
    const {id} = req.params;
    const {name, total_quantity, price, description, id_category, status} = req.body;
    try {
        const [updatedProduct] = await Products.update({name, total_quantity, price, description, id_category, status}, {where : {id_product : id}});
        let isUpdated;
        updatedProduct <= 0 ? (isUpdated = false) : (isUpdated = true);
        res.status(200).json({
            ok : true,
            status : 200,
            message : "Updated Product",
            body : {
                affectedRows : updatedProduct,
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

export const changeStatusById = async(req, res) => {
    const {id} = req.params;
    try {
        const product = await Products.findByPk(id);
        const newStatus = product.status == 1 ? 0 : 1;
        const patchedProduct = await Products.update({status : newStatus}, {where : {id_product : id}});
        let isPatched;
        patchedProduct <= 0 ? (isPatched = false) : (isPatched = true);
        console.log(newStatus)
        res.status(201).json({
            ok : true,
            status : 201,
            body : {
                patchedProduct,
                isPatched
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

export const deleteProductById = async(req, res) => {
    const {id} = req.params;
    try {
        const deletedProduct = await Products.destroy({where : {id_product : id}});
        let isDeleted;
        deletedProduct <= 0 ? (isDeleted = false) : (isDeleted = true);
        res.status(201).json({
            ok : true,
            status : 204,
            body : {
                deletedProduct,
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
