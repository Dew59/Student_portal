import express from 'express';
import validate from "../middlewares/validate.js";
import { createStudent, getStudentData, getSingleStudentData, deleteStudent, updateStudent } from "../controllers/studentsController.js";
import { registerStudentSchema, updateStudentSchema } from '../validator/studentValidator.js';

const router = express.Router()

router.post('/signup', validate(registerStudentSchema), createStudent)
router.get('/get', getStudentData)
router.get('/get/:id', getSingleStudentData)
router.patch('/update/:id', validate(updateStudentSchema), updateStudent)
router.delete('/delete/:id', deleteStudent)


export default router;