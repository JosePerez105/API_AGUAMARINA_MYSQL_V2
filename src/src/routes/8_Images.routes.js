import { Router } from "express";
import { createImage, deleteImageById, getImageById, getImages, getImagesByProduct, updateImageById } from "../controllers/8_Images.controller.js";

const router = Router();

router.get('/images', [], getImages); // Obtener todo
router.get('/images/:id', [], getImageById); // Obtener por Id (req.params)
router.get('/images_product/:id', [], getImagesByProduct) // Obtener por Producto (req.params)
router.post('/images', [], createImage); // Crear (req.body)
router.put('/images/:id', [], updateImageById); // Editar (req.params y req.body)
router.delete('/images/:id', [], deleteImageById); // Eliminar (req.params)

export default router;