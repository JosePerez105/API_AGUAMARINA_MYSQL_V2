import { Router } from "express";
import { createReservation, deleteReservationById, getReservationById, getReservations, getReservationsByUser, updateReservationById } from "../controllers/10_Reservations.controller.js";

const router = Router();

router.get('/reservations', [], getReservations); // Obtener todo
router.get('/reservations/:id', [], getReservationById); // Obtener por Id (req.params)
router.get('/reservations_user/:id', [], getReservationsByUser); // Obtener por User (req.params)
router.post('/reservations', [], createReservation); // Crear (req.body)
router.put('/reservations/:id', [], updateReservationById); // Editar (req.params y req.body)
router.delete('/reservations/:id', [], deleteReservationById); // Eliminar (req.params)

export default router;