import Products from '../models/7_Product.model.js';
import Reservations from '../models/10_Reservation.model.js';
import ReservationDetails from '../models/11_ReservationDetail.model.js';
import Images from '../models/8_Image.model.js';

export const getProducts = async (req, res) => {
    try {
        const allProducts = await Products.findAll();

        const products = await Promise.all(allProducts.map(async (prod) => {
            const images = await Images.findAll({ where: { id_product: prod.id_product } });
            prod.setDataValue('images', images);
            return prod;
        }));

        res.status(200).json({
            ok: true,
            status: 200,
            body: products,
        });

    } catch (err) {
        res.status(400).json({
            ok: false,
            status: 400,
            err: err.message,
        });
    }
};

export const getProductsCatalog = async(req, res) => {
    try {
        const allProducts = await Products.findAll({where : {status : true}});

        const products = await Promise.all(allProducts.map(async (prod) => {
            const images = await Images.findAll({ where: { id_product: prod.id_product } });
            prod.setDataValue('images', images);
            return prod;
        }));

        res.status(200).json({
            ok: true,
            status: 200,
            body: products,
        });

    } catch (err) {
        res.status(400).json({
            ok: false,
            status: 400,
            err: err.message,
        });
    }
};

export const getProductById = async(req, res) => {
    const {id} = req.params;
    try {
        const product = await Products.findByPk(id);
        const images = await Images.findAll({ where: { id_product: product.id_product } });
        product.setDataValue('images', images);
        res.status(200).json({
            ok : true,
            status : 200,
            body : product
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
        const allProducts = await Products.findAll({where : {id_category : id}});

        const products = await Promise.all(allProducts.map(async (prod) => {
            const images = await Images.findAll({ where: { id_product: prod.id_product } });
            prod.setDataValue('images', images);
            return prod;
        }));

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

export const findProductByDateRange = async(req, res) => {
    const {start_date, end_date} = req.body
    const start = new Date(start_date);
    const end = new Date(end_date);
    try {
        const allReservations = await Reservations.findAll();

        const reservationsIdsInRange = allReservations
            .filter((res) => {
                return (
                    new Date(res.start_date) <= end &&
                    new Date(res.end_date) >= start &&
                    (res.status == "En Espera" || res.status == "Aprobado")
                );
            })
            .map((res) => res.id_reservation);

        console.log("IDS Reservas: ", reservationsIdsInRange)
        let reservationDetailsInRange = await Promise.all(
            reservationsIdsInRange.map(async (id) => {
                return await ReservationDetails.findAll({
                    where: { id_reservation: id },
                });
            })
        );
        reservationDetailsInRange = reservationDetailsInRange.flat();

        const allProducts = await Products.findAll();   
        
        let products = await Promise.all(allProducts.map(async(prod) => {
            const images = await Images.findAll({ where: { id_product: prod.id_product } });
            prod.setDataValue('images', images);
            let disponibility = prod.total_quantity;
            reservationDetailsInRange.forEach((detail) => {
                if (detail.id_product == prod.id_product) {
                    disponibility -= detail.quantity
                }
            })
            if (disponibility < 0) {
                prod.setDataValue('disponibility', 0);
            } else {
                prod.setDataValue('disponibility', disponibility);
            }
            console.log(prod)
            return prod
        }));

        res.status(200).json({
            ok : true,
            status : 200,
            body : {
                products
            }
        });

    } catch (err) {
        res.status(400).json({
            ok : false,
            status : 400,
            err : err.message
        });
    }
};