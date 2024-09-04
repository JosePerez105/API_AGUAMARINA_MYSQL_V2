import { Router } from "express";
import { createProduct, deleteProductById, getProductById, getProducts, getProductsByCategory, updateProductById } from "../controllers/7_Products.controller.js";

const router = Router();

router.get('/products', [], getProducts); // Obtener todo
router.get('/products/:id', [], getProductById); // Obtener por Id (req.params)
router.get('/products_category/:id', [], getProductsByCategory) // Obtener por Categoria (req.params)
router.post('/products', [], createProduct); // Crear (req.body)
router.put('/products/:id', [], updateProductById); // Editar (req.params y req.body)
router.delete('/products/:id', [], deleteProductById); // Eliminar (req.params)

export default router;