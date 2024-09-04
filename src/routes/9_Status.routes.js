import { Router } from "express";
import { createStatus, deleteStatusById, getStatus, getStatusById, updateStatusById } from "../controllers/9_Status.controller.js";

const router = Router();

router.get('/status', [], getStatus); // Obtener todo
router.get('/status/:id', [], getStatusById); // Obtener por Id (req.params)
router.post('/status', [], createStatus); // Crear (req.body)
router.put('/status/:id', [], updateStatusById); // Editar (req.params y req.body)
router.delete('/status/:id', [], deleteStatusById); // Eliminar (req.params)

export default router;