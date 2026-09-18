import express from 'express';
import validate from '../middlewares/validate.js'
import { uploadProduct, getProducts, getProduct } from '../controllers/productController.js';
import { uploadProductSchema } from '../validator/productValidator.js';
import upload from '../config/multerConfig.js'

const router = express.Router()

router.post('/upload/:studentId', upload.single('image'), validate(uploadProductSchema), uploadProduct)
router.get('/get-product/:productId', getProduct)
router.get('/get-products/', getProducts)

export default router