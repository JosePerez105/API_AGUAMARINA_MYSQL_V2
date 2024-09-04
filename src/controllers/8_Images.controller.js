import Images from '../models/8_Image.model.js'

export const getImages = async(req, res) => {
    const images = await Images.findAll();
    try {
        res.status(200).json({
            ok : true,
            status : 200,
            body : images
        });
    } catch(err) {
        res.status(400).json({
            ok : false,
            status : 400,
            err
        });
    };
};

export const getImageById = async(req, res) => {
    const {id} = req.params;
    try {
        const images = await Images.findByPk(id);
        res.status(200).json({
            ok : true,
            status : 200,
            body : images
        });
    } catch(err) {
        res.status(400).json({
            ok : false,
            status : 400,
            err
        });
    };
};

export const getImagesByProduct = async(req, res) => {
    const {id} = req.params;
    try {
        const images = await Images.findAll({where : {id_product : id}});
        res.status(200).json({
            ok : true,
            status : 200,
            body : images
        });
    } catch(err) {
        res.status(400).json({
            ok : false,
            status : 400,
            err
        });
    }
};

export const createImage = async(req, res) => {
    const {id_product, path_image} = req.body;
    try {
        const createdImage = await Images.create({id_product, path_image});
        res.status(201).json({
            ok : true,
            status : 201,
            message : "Created Image",
            body : createdImage
        });
    } catch(err) {
        res.status(400).json({
            ok : false,
            status : 400,
            err
        });
    };
};

export const updateImageById = async(req, res) => {
    const {id} = req.params;
    const {id_product, path_image} = req.body;
    try {
        const [updatedImage] = await Images.update({id_product, path_image}, {where : {id_image : id}});
        let isUpdated;
        updatedImage <= 0 ? (isUpdated = false) : (isUpdated = true);
        res.status(200).json({
            ok : true,
            status : 200,
            message : "Updated Image",
            body : {
                affectedRows : updatedImage,
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

export const deleteImageById = async(req, res) => {
    const {id} = req.params;
    try {
        const deletedImage = await Images.destroy({where : {id_image : id}});
        let isDeleted;
        deletedImage <= 0 ? (isDeleted = false) : (isDeleted = true);
        res.status(201).json({
            ok : true,
            status : 204,
            body : {
                deletedImage,
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