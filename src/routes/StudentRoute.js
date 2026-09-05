const express = require('express');
const {createStudent, getSingleStudentData, deleteStudent, updateStudent} = require('../controllers/studentsController')
const {registerStudentSchema, updateStudentSchma} = require('../validator/studentValidator')
const validate = require('../middlewares/validate')


const router = express.Router();

router.post('/student-signup', validate(registerStudentSchema), createStudent)
router.get('/get-student/:id', getSingleStudentData)
router.delete('/delete-student/:id', deleteStudent)
router.patch('/update-student/:id', validate(updateStudentSchma), updateStudent)

module.exports = router;