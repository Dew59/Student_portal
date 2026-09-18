import Student from '../models/studentsModel.js';
import AppError from '../utils/appError.js'
import asyncHandler from '../utils/asyncHanler.js'

export const createStudent = asyncHandler(async (req, res, next) => {
    const { body: { name, email, password, registrationNumber }, } = req.validatedData

    const studentExist = await Student.findOne({ email })
    if (studentExist) return next(new AppError('Student already exist', 409))
    const studentExist2 = await Student.findOne({ registrationNumber })
    if (studentExist2) return next(new AppError('Student already exist', 409))

    const createdStudent = await Student.create({ name, email, password, registrationNumber })

    createdStudent.password = undefined;

    res.status(201).json({
        status: 'success',
        message: 'student created successfully',
        data: createdStudent
    })
})

export const loginStudent = asyncHandler(async (req, res) => {
    const { body: { registrationNumber, password } } = req.validatedData

    const student = await Student.findOne({ registrationNumber, }).select('+password')
    if (!student) {
        throw new AppError('Invalid credentials', 401)
    }

    const isPasswordValid = await student.comparePassword(password)
    if (!isPasswordValid) {
        throw new AppError('Invalid credentials', 401)
    }

    student.password = undefined;

    return res.status(200).json({
        status: 'success',
        data: student
    })
})

export const getStudentData = asyncHandler(async (req, res, next) => {
    const students = await Student.find()

    res.status(200).json({
        status: 'success',
        data: students
    })
})

export const getSingleStudentData = asyncHandler(async (req, res, next) => {
    const { id } = req.params

    const getSingle = await Student.findById(id)
    if (!getSingle) return next(new AppError("Student not found", 404))

    return res.status(200).json({
        status: 'success',
        data: getSingle
    })
})

export const deleteStudent = asyncHandler(async (req, res, next) => {
    const { id } = req.params

    const deletedStudent = await Student.findByIdAndDelete(id)
    if (!deletedStudent) return next(new AppError("Student not found", 404))

    return res.status(200).json({
        status: 'success',
        data: deletedStudent
    })
})

export const updateStudent = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    const { body: { name } } = req.validatedData

    if (!name) return next(new AppError('Enter a valid name', 409))

    const updatedStudent = await Student.findByIdAndUpdate(id, { name }, { new: true, runValidators: true })
    if (!updatedStudent) return next(new AppError('Student not found', 404))

    return res.status(200).json({
        status: 'success',
        data: updatedStudent
    })
})