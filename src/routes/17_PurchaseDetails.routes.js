import { Router } from "express";
import { createPurchaseDetail, deletePurchaseDetailById, getPurchaseDetailById, getPurchaseDetails, getPurchasesDetailsByPurchase, updatePurchaseDetailById } from "../controllers/17_PurchaseDetails.controller.js";

const router = Router();

router.get('/purchasedetails', [], getPurchaseDetails); // Obtener todo
router.get('/purchasedetails/:id', [], getPurchaseDetailById); // Obtener por Id (req.params)
router.get('/purchasedetails_purchase/:id', [], getPurchasesDetailsByPurchase); // Obtener por Purchase (req.params)
router.post('/purchasedetails', [], createPurchaseDetail); // Crear (req.body)
router.put('/purchasedetails/:id', [], updatePurchaseDetailById); // Editar (req.params y req.body)
router.delete('/purchasedetails/:id', [], deletePurchaseDetailById); // Eliminar (req.params)

export default router;