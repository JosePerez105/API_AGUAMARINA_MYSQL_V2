import { Router } from "express";
import { createUser, deleteUserById, getUserById, getUserByMail, getUsers, updateUserById } from "../controllers/18_Users.controller.js";
import { generateCode, validateVerificationCode } from "../controllers/19_VerificationCodes.controller.js";

const router = Router();

router.get('/verificationcodes', [], getUsers); // Obtener todo
router.post('/verificationcodes_generate', [], generateCode); // Generar Código por Correo (req.params)
router.post('/verificationcodes_validate', [], validateVerificationCode); // Validar Verification Code (req.body)
router.put('/verificationcodes/:id', [], updateUserById); // Editar (req.params y req.body)
router.delete('/verificationcodes/:id', [], deleteUserById); // Eliminar (req.params)

export default router;