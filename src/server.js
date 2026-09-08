import dotenv from 'dotenv'
dotenv.config();

const port = 5000;
import app from './app.js'
import connectDb from './config/dbConfig.js'

const startServer = async () => {
    try {
        await connectDb();
        app.listen(port, () => {
            console.log(`server running on port ${port}`)
        })
    } catch (error) {
        console.log(error)
    }
}

startServer()