import { Router } from "express";
import { getRolById, getRoles, createRol, updateRolById, deleteRolById, addPermissions } from "../controllers/1_roles.controller.js";

const router = Router();

router.get('/roles', [], getRoles); // Obtener todo
router.get('/roles/:id', [], getRolById); // Obtener por Id (req.params)
router.post('/roles', [], createRol); // Crear (req.body)
router.put('/roles/:id', [], updateRolById); // Editar (req.params y req.body)
router.delete('/roles/:id', [], deleteRolById); // Eliminar (req.params)

router.post('/addrolepermission', [], addPermissions) // Añadir permisos al Rol (req.body)

export default router;