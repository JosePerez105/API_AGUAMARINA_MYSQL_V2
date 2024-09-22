import Reservations from '../models/10_Reservation.model.js'
import Details from '../models/11_ReservationDetail.model.js'
import Products from '../models/7_Product.model.js';

export const getReservations = async(req, res) => {
    const reservations = await Reservations.findAll();
    try {
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
        const reservations = await Reservations.findByPk(id);
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

export const getReservationsByUser = async(req, res) => {
    const {id} = req.params;
    try {
        const reservations = await Reservations.findAll({where : {id_user : id}});
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
    
    try {
        const createdReservation = await Reservations.create({
            id_user,
            start_date,
            end_date,
            address,
            city,
            neighborhood,
            status
        });
        
        const id_reservation = createdReservation.id_reservation;
        let total_reservation = 0;

        const detailsList = await Promise.all(details.map(async (detail) => {
            const productDetail = await Products.findByPk(detail.id_product);

            if (!productDetail) {
                throw new Error(`Product with ID ${detail.id_product} not found`);
            }

            const createdDetail = await Details.create({
                id_reservation,
                id_product: detail.id_product,
                quantity: detail.quantity,
                unit_price: productDetail.price,
                total_price: detail.quantity * productDetail.price
            });

            total_reservation += createdDetail.total_price;
            return createdDetail;
        }));

        await Reservations.update({ total_reservation }, { where: { id_reservation } });

        res.status(201).json({
            ok: true,
            status: 201,
            message: "Reservation created successfully",
            body: { reservation: createdReservation, details: detailsList }
        });
    } catch (err) {
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