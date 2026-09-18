import productModel from "../models/productModel.js";
import Student from "../models/studentsModel.js";
import asyncHandler from "../utils/asyncHanler.js";
import AppError from "../utils/appError.js";
import cloudinary from "../config/cloudinaryConfig.js";

export const uploadProduct = asyncHandler (async (req, res) => {
    const { studentId } = req.params

    const { body: { name, description, price, category, stock, quantity }, file } = req.validatedData

    const student = await Student.findById(studentId);

    if(!student) {
        throw new AppError('User not found', 404)
    }

    if(!req.file) {
        throw new AppError('Image is required', 400)
    }

    const result = await cloudinary.uploader.upload(req.file.path)

    const imageUrl = result.secure_url

    const product = await productModel.create({ name, description, price, category, stock, quantity, image: imageUrl })

    await student.products.push(product._id)
    await student.save()

    return res.status(201).json({
        status: 'success',
        data: product
    })
});

export const getProducts = asyncHandler (async (req, res) => {
    const products = await productModel.find();

    return res.status(200).json({
        status: 'success',
        data: products
    })
})

export const getProduct = asyncHandler (async (req, res) => {
    const { productId } = req.params

    const product = await productModel.findById(productId);
    if(!product) {
        throw new AppError('Product not found', 404)
    }

    return res.status(200).json({
        status: 'success',
        data: product
    })
})