import { Router } from "express";
import multer from "multer";
import { createImage, deleteImageById, getImageById, getImages, getImagesByProduct, updateImageById, uploadImages } from "../controllers/8_Images.controller.js";

const router = Router();

router.get('/images', [], getImages); // Obtener todo
router.get('/images/:id', [], getImageById); // Obtener por Id (req.params)
router.get('/images_product/:id', [], getImagesByProduct) // Obtener por Producto (req.params)
router.post('/images', [], createImage); // Crear (req.body)
router.put('/images/:id', [], updateImageById); // Editar (req.params y req.body)
router.delete('/images/:id', [], deleteImageById); // Eliminar (req.params)



//Funcionalidad de Cloudinary
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './src/utils/uploads');
    },
    filename: (req, file, cb) => {
      const ext = file.originalname.split('.').pop();
      cb(null, `${Date.now()}.${ext}`);
    },
});

const upload = multer({ storage });

router.post('/images/upload', [], upload.single('file'), uploadImages)




export default router;