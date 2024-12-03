import Reservations from '../models/10_Reservation.model.js'
import Details from '../models/11_ReservationDetail.model.js'
import Products from '../models/7_Product.model.js';
import sequelize from '../db/sequelize.js';
import Address from '../models/5_Address.model.js';
import City from "../models/4_City.model.js";
import Image from "../models/8_Image.model.js";
import dayjs from 'dayjs';
import User from '../models/18_User.model.js';

export const getReservations = async(req, res) => {
    const allReservations = await Reservations.findAll();
    try {
        const reservations = await Promise.all(allReservations.map(async (reserva) => {
            const details = await Details.findAll({ where: { id_reservation: reserva.id_reservation } });


            await Promise.all(details.map(async (detail) => {
                const paths = await Image.findAll({where : {id_product : detail.id_product}});
                const urls = paths.map(img => img.path_image);
                detail.setDataValue('urls', urls);
            }));

            const user = await User.findByPk(reserva.id_user);
            const fullname = user.names + " " + user.lastnames;
            reserva.setDataValue('name_client', fullname);

            reserva.setDataValue('details', details);
            return reserva;
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
        const user = await User.findByPk(res.id_user);
            const name = user.name;
            res.setDataValue('name_client', name);
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
    const { id_user, start_date, end_date, id_address, status= "En Espera", details = [] } = req.body;

    const transaction = await sequelize.transaction();
    const address = await Address.findByPk(id_address);

    try {
        const start = dayjs(start_date);
        const end = dayjs(end_date);
        const res_days = end.diff(start, "day") + 1 //Cantidad de dias de la duración de la reserva
        const three_days_range = Math.ceil(res_days / 3) //Cobrar el valor cada 3 dias de alquiler
        const city = await City.findByPk(address.id_city);
        const createdReservation = await Reservations.create({
            id_user,
            start_date,
            end_date,
            address : address.address,
            city : city.name,
            neighborhood : address.neighborhood,
            reference : address.reference,
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
    const {id_user, start_date, end_date, adress, city, neighborhood, reference, status} = req.body;
    try {
        const [updatedReservation] = await Reservations.update({id_user, start_date, end_date, adress, city, neighborhood, reference, status}, {where : {id_reservation : id}});
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
    const {cancel_reason} = req.body;
    const newStatus = "Denegado"
    try {
        const [denniedReservation] = await Reservations.update({status : newStatus, cancel_reason : cancel_reason}, {where : {id_reservation : id}});
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
    const {cancel_reason} = req.body;
    const newStatus = "Cancelado"
    try {
        const [canceledReservation] = await Reservations.update({status : newStatus, cancel_reason : cancel_reason}, {where : {id_reservation : id}});
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