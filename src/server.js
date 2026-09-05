const dotenv = require('dotenv');
dotenv.config();

const port = 5000;
const app = require('./app');
const connectDb = require('./config/dbConfig');

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