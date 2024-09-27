import { Router } from "express";
import { checkAuth, checkCookie, forgotPassword, validateLogin, validateLogout, validateToken } from "../controllers/20_Authentications.controller.js";

const router = Router();

router.post('/validate_login', [], validateLogin); // Login validado (req.body)
router.post('/validate_token', [], validateToken); // Validar Token JWT (req.cookie)
router.post('/validate_logout', [], validateLogout); // Cerrar Sesión (req.cookie)

router.get('/check_auth', [], checkAuth); //Validar Sesión Iniciado (req.cookie)
router.get('/check_cookie', [], checkCookie); //Obtener Payload de la Cookie (req.cookie)

//Rutas de restablecimiento de contraseña
router.post('/forgot_password', [], forgotPassword); //Enviar Correo de Reestablecimiento (req.body)

export default router;