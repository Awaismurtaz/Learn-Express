const express = require('express');
const app = express();
const port = process.env.PORT || 4000
const db = require('./config/db')
const cors = require("cors");
const bodyParser = require('body-parser');
const authRoute = require('./routes/authentication/authRout')
const privateRoute = require('./routes/private/createJobRout')
require('dotenv').config();


app.use(cors())
app.use(express.json())
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }));

// routes
// auth route
app.use('/api', authRoute)
// private routes
app.use('/api', privateRoute)

app.listen(port, () => {
    console.log(`server is running at http://localhost:${port}/`)
})