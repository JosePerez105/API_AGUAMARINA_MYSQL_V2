import { json } from 'sequelize';
import Categories from '../models/6_Category.model.js'

export const getCategories = async(req, res) => {
    const categories = await Categories.findAll();
    try {
        res.status(200).json({
            ok : true,
            status : 200,
            body : categories
        });
    } catch(err) {
        res.status(400).json({
            ok : false,
            status : 400,
            err
        });
    };
};

export const getCategoryById = async(req, res) => {
    const {id} = req.params;
    try {
        const categories = await Categories.findByPk(id);
        res.status(200).json({
            ok : true,
            status : 200,
            body : categories
        });
    } catch(err) {
        res.status(400).json({
            ok : false,
            status : 400,
            err
        });
    };
};

export const createCategory = async(req, res) => {
    const {name} = req.body;
    try {
        const createdCategory = await Categories.create({name});
        res.status(201).json({
            ok : true,
            status : 201,
            message : "Created Category",
            body : createdCategory
        });
    } catch(err) {
        res.status(400).json({
            ok : false,
            status : 400,
            err
        });
    };
};

export const updateCategoryById = async(req, res) => {
    const {id} = req.params;
    const {name} = req.body;
    try {
        console.log("entra")
        const updatedCategory = await Categories.update({name}, {where : {id_category : id}});
        let isUpdated;
        console.log("siii")
        updatedCategory <= 0 ? (isUpdated = false) : (isUpdated = true);
        res.status(200).json({
            ok : true,
            status : 200,
            message : "Updated Category",
            body : {
                affectedRows : updatedCategory,
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

export const deleteCategoryById = async(req, res) => {
    const {id} = req.params;
    try {
        const deletedCategory = await Categories.destroy({where : {id_category : id}});
        let isDeleted;
        deletedCategory <= 0 ? (isDeleted = false) : (isDeleted = true);
        res.status(201).json({
            ok : true,
            status : 204,
            body : {
                deletedCategory,
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