const express = require('express');
const globalErorrHandler = require('./middlewares/errHAndler')
const studentRoute = require('./routes/StudentRoute')

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hello World")
})

app.use('/api/v1/auth', studentRoute)

app.use(globalErorrHandler)

module.exports = app