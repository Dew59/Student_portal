import express from 'express'
import globalErrorHandler from './middlewares/errHAndler.js';
import studentRoute from './routes/studentRoutes.js'

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hello World")
})

app.use('/api/v1/auth/student', studentRoute)

app.use(globalErrorHandler)

export default app;