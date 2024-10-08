import Reservations from '../models/10_Reservation.model.js'
import Details from '../models/11_ReservationDetail.model.js'
import Products from '../models/7_Product.model.js';
import sequelize from '../db/sequelize.js';

export const getReservations = async(req, res) => {
    const allReservations = await Reservations.findAll();
    try {
        const reservations = await Promise.all(allReservations.map(async (res) => {
            const details = await Details.findAll({ where: { id_reservation: res.id_reservation } });
            res.setDataValue('details', details);
            return res;
        }));
        res.status(200).json({
            ok : true,
            status : 200,
            body : reservations
        });
    } catch(err) {
        res.status(400).json({
            ok : false,
            status : 400,
            err
        });
    };
};

export const getReservationById = async(req, res) => {
    const {id} = req.params;
    try {
        const reservation = await Reservations.findByPk(id);
        const details = await Details.findAll({ where: { id_reservation: reservation.id_reservation } });
        reservation.setDataValue('details', details);
        res.status(200).json({
            ok : true,
            status : 200,
            body : reservation
        });
    } catch(err) {
        res.status(400).json({
            ok : false,
            status : 400,
            err
        });
    };
};

export const getReservationsByUser = async(req, res) => {
    const {id} = req.params;
    try {
        const allReservations = await Reservations.findAll({where : {id_user : id}});
        const reservations = await Promise.all(allReservations.map(async (res) => {
            const details = await Details.findAll({ where: { id_reservation: res.id_reservation } });
            res.setDataValue('details', details);
            return res;
        }));
        res.status(200).json({
            ok : true,
            status : 200,
            body : reservations
        });
    } catch(err) {
        res.status(400).json({
            ok : false,
            status : 400,
            err
        });
    };
};
export const createReservation = async (req, res) => {
    const { id_user, start_date, end_date, address, city, neighborhood, status, details = [] } = req.body;

    const transaction = await sequelize.transaction(); // Iniciar la transacción

    try {
        // Crear la reserva
        const createdReservation = await Reservations.create({
            id_user,
            start_date,
            end_date,
            address,
            city,
            neighborhood,
            status
        }, { transaction });

        const id_reservation = createdReservation.id_reservation;
        let total_reservation = 0;

        // Crear los detalles de la reserva dentro de la transacción
        const detailsList = await Promise.all(details.map(async (detail) => {
            const productDetail = await Products.findByPk(detail.id_product, { transaction });

            if (!productDetail) {
                throw new Error(`Product with ID ${detail.id_product} not found`);
            }

            const createdDetail = await Details.create({
                id_reservation,
                id_product: detail.id_product,
                quantity: detail.quantity,
                unit_price: productDetail.price,
                total_price: detail.quantity * productDetail.price
            }, { transaction });

            total_reservation += parseFloat(createdDetail.total_price);
            return createdDetail;
        }));

        // Actualizar el total de la reserva
        await Reservations.update({ total_reservation }, { where: { id_reservation }, transaction });

        // Confirmar la transacción
        await transaction.commit();

        // Enviar respuesta exitosa
        res.status(201).json({
            ok: true,
            status: 201,
            message: "Reservation created successfully",
            body: { reservation: createdReservation, details: detailsList }
        });
    } catch (err) {
        // Si hay un error, deshacer los cambios
        await transaction.rollback();
        res.status(400).json({
            ok: false,
            status: 400,
            error: err.message || err
        });
    }
};

export const updateReservationById = async(req, res) => {
    const {id} = req.params;
    const {id_user, start_date, end_date, adress, city, neighborhood, status} = req.body;
    try {
        const [updatedReservation] = await Reservations.update({id_user, start_date, end_date, adress, city, neighborhood, status}, {where : {id_reservation : id}});
        let isUpdated;
        updatedReservation <= 0 ? (isUpdated = false) : (isUpdated = true);
        res.status(200).json({
            ok : true,
            status : 200,
            message : "Updated Reservation",
            body : {
                affectedRows : updatedReservation,
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

export const deleteReservationById = async(req, res) => {
    const {id} = req.params;
    try {
        const deletedReservation = await Reservations.destroy({where : {id_reservation : id}});
        let isDeleted;
        deletedReservation <= 0 ? (isDeleted = false) : (isDeleted = true);
        res.status(201).json({
            ok : true,
            status : 204,
            body : {
                deletedReservation,
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

export const approveReservationById = async(req, res) => {
    const {id} = req.params;
    const newStatus = "Aprobado"
    try {
        const [approvedReservation] = await Reservations.update({status : newStatus}, {where : {id_reservation : id}});
        let isApproved;
        approvedReservation <= 0 ? (isApproved = false) : (isApproved = true);
        res.status(200).json({
            ok : true,
            status : 200,
            message : "Approved Reservation",
            body : {
                affectedRows : approvedReservation,
                isApproved
            }
        });
    } catch (err) {
        res.status(400).json({
            ok : false,
            status : 400,
            err
        });
    }
};

export const denyReservationById = async(req, res) => {
    const {id} = req.params;
    const newStatus = "Denegado"
    try {
        const [denniedReservation] = await Reservations.update({status : newStatus}, {where : {id_reservation : id}});
        let isDennied;
        denniedReservation <= 0 ? (isDennied = false) : (isDennied = true);
        res.status(200).json({
            ok : true,
            status : 200,
            message : "Dennied Reservation",
            body : {
                affectedRows : denniedReservation,
                isDennied
            }
        });
    } catch (err) {
        res.status(400).json({
            ok : false,
            status : 400,
            err
        });
    }
};

export const cancelReservationById = async(req, res) => {
    const {id} = req.params;
    const newStatus = "Cancelado"
    try {
        const [canceledReservation] = await Reservations.update({status : newStatus}, {where : {id_reservation : id}});
        let isCanceled;
        canceledReservation <= 0 ? (isCanceled = false) : (isCanceled = true);
        res.status(200).json({
            ok : true,
            status : 200,
            message : "Canceled Reservation",
            body : {
                affectedRows : canceledReservation,
                isCanceled
            }
        });
    } catch (err) {
        res.status(400).json({
            ok : false,
            status : 400,
            err
        });
    }
};


export const sendMail = async(req,res) => {
    
};