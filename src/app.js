import express from 'express'
import globalErrorHandler from './middlewares/errHandler.js';
import studentRoute from './routes/studentRoute.js'

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hello World")
})

app.use('/api/v1/auth', studentRoute)

app.use(globalErrorHandler)

export default app;