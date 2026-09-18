import multer from 'multer';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/student_portal');
    },
    filename: function (req, file, cb) {
        cb(null, file.filename + '_' + Date.now() + '_' + file.originalname);
    }
})

const upload = multer({ storage: storage })


export default upload;