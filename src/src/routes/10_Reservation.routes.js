import { Router } from "express";
import { createReservation, deleteReservationById, getReservationById, getReservations, getReservationsByUser, updateReservationById } from "../controllers/10_Reservations.controller.js";

const router = Router();

router.get('/reservation', [], getReservations); // Obtener todo
router.get('/reservation/:id', [], getReservationById); // Obtener por Id (req.params)
router.get('/reservation_user/:id', [], getReservationsByUser); // Obtener por User (req.params)
router.post('/reservation', [], createReservation); // Crear (req.body)
router.put('/reservation/:id', [], updateReservationById); // Editar (req.params y req.body)
router.delete('/reservation/:id', [], deleteReservationById); // Eliminar (req.params)

export default router;