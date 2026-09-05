const Student = require('../models/studentsModel');
const AppError = require('../middlewares/appError')

const createStudent = async (req, res, next) => {
    try {
        const {name, email, password, registrationNumber } = req.validatedData

        const studentExist = await Student.findOne({ email })
        if(studentExist) return next( new AppError('Student already exist', 409))
        const studentExist2 = await Student.findOne({ registrationNumber })
        if(studentExist2) return next( new AppError('Student already exist', 409))
        
        const createdStudent = await Student.create({name, email, password, registrationNumber })

        createdStudent.password = undefined;

        res.status(201).json({
            status: 'success',
            message: 'student created successfully',
            data: createdStudent
        })
    } catch (error) {
        next(error)
        console.log('student creation', error)
    }
}

const getSingleStudentData = async (req, res, next) => {
    try {
        const { id } = req.params

        const getSingle = await Student.findById(id)
        if(!getSingle) return next(new AppError("Student not found", 404))
        
        return res.status(200).json({
            status: 'success',
            data: getSingle
        })
    } catch (error) {
        next(error)
        console.log('get student', error)
    }
}

const deleteStudent = async (req, res, next) => {
    try {
       const { id } = req.params

       const deletedStudent = await Student.findByIdAndDelete(id)
       if(!deletedStudent) return next(new AppError("Student not found", 404))

        return res.status(200).json({
            status: 'success',
            data: deletedStudent
        })

    } catch (error) {
        next(error)
        console.log('delete student', error)
    }
}

const updateStudent = async (req,res, next) => {
    try {
      const { id }  = req.params
      const { name } = req.validatedData

      if(!name) return next(new AppError('Enter a valid name', 409))

      const updatedStudent = await Student.findByIdAndUpdate(id, { name }, { new: true, runValidators: true})
      if(!updatedStudent) return next(new AppError('Student not found', 404))

        return res.status(200).json({
            status: 'success',
            data: updatedStudent
        })
    } catch (error) {
        next(error)
        console.log('update student', error)
    }
}

module.exports = {createStudent, getSingleStudentData, deleteStudent, updateStudent}