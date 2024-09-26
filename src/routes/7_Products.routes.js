import { Router } from "express";
import { changeStatusById, createProduct, deleteProductById,getProductById, getProducts, getProductsByCategory, getProductsCatalog, updateProductById } from "../controllers/7_Products.controller.js";


const router = Router();

router.get('/products', [], getProducts); // Obtener todo
router.post('/products', [], getProducts); // Obtener todo posiblemente por fechas (req.body)
router.get('/products_catalog', [], getProductsCatalog); // Obtener todo
router.get('/products/:id', [], getProductById); // Obtener por Id (req.params)
router.get('/products_category/:id', [], getProductsByCategory) // Obtener por Categoria (req.params)
router.post('/products', [], createProduct); // Crear (req.body)
router.put('/products/:id', [], updateProductById); // Editar (req.params y req.body)
router.patch('/products/:id', [], changeStatusById); // Cambiar estado (req.params)
router.delete('/products/:id', [], deleteProductById); // Eliminar (req.params)


export default router;