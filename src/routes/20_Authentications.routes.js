import { Router } from "express";
import { validateLogin, validateLogout, validateToken } from "../controllers/20_Authentications.controller.js";

const router = Router();

router.post('/validate_login', [], validateLogin); // Login validado (req.body)
router.post('/validate_token', [], validateToken); // Validar Token JWT (req.cookie)
router.post('/validate_logout', [], validateLogout); // Cerrar Sesión (req.cookie)

export default router;