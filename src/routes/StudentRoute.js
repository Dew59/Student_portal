import express from 'express';
import {createStudent, getSingleStudentData, deleteStudent, updateStudent} from '../controllers/studentsController.js'
import {registerStudentSchema, updateStudentSchema} from '../validator/studentValidator.js'
import validate from '../middlewares/validate.js'


const router = express.Router();

router.post('/student-signup', validate(registerStudentSchema), createStudent)
router.get('/get-student/:id', getSingleStudentData)
router.delete('/delete-student/:id', deleteStudent)
router.patch('/update-student/:id', validate(updateStudentSchema), updateStudent)

export default router;