import { Router } from "express";
import { createPurchase, deletePurchaseById, getPurchaseById, getPurchases, getPurchasesByUser, updatePurchaseById } from "../controllers/16_Purchases.controller.js";

const router = Router();

router.get('/purchases', [], getPurchases); // Obtener todo
router.get('/purchases/:id', [], getPurchaseById); // Obtener por Id (req.params)
router.get('/purchases_user/:id', [], getPurchasesByUser); // Obtener por User (req.params)
router.post('/purchases', [], createPurchase); // Crear (req.body)
router.put('/purchases/:id', [], updatePurchaseById); // Editar (req.params y req.body)
router.delete('/purchases/:id', [], deletePurchaseById); // Eliminar (req.params)

export default router;