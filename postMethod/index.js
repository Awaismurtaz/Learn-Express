const express = require('express')
const app = express()
const bodyParyser = require('body-parser')
const port = process.env.PORT || 3000
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
app.use(express.json())
app.use(bodyParyser.urlencoded({ extended: true }))

const createUser = [];

app.get('/', (req, res) => {
    res.send("welcome to this post method page")
})

// basic post request
app.post('/submit', (req, res) => {
    const data = req.body
    res.send(`Received data ${JSON.stringify(data)}`)
})

// handle Form submission 
app.post('/user/info', (req, res) => {
    const { name, email, password } = req.body
    res.send(`Received data ${JSON.stringify({ name, email, password })}`)
})
// create user
app.post('/create/user', (req, res) => {
    const user = req.body
    createUser.push(user)
    if (!user || Object.keys(user).length === 0) return res.status(400).send({ msg: "please add user" })
    res.status(201).send(createUser)
})
// upload file 
app.post('/upload/file', upload.single('file'), (req, res) => {
    res.send(`File uploaded: ${req.file.originalname}`);
})

app.listen(port, () => {
    console.log(`server running at http:localhost:${port}/`)
})
