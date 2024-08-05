const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON data
app.use(bodyParser.json());

// Middleware to parse URL-encoded data (form submissions)
app.use(bodyParser.urlencoded({ extended: true }));

// basic get api
app.get('/', (req, res) => {
    res.send("welcome to this page")
})

// quarry param
app.get('/about', (req, res) => {
    const name = req.query.name;
    const message = name ? `Welcome ${name}! This is the About page` : 'Welcome to the about page ';
    res.send(message)
})

//  URL Parameters
app.get('/user/:id', (req, res) => {
    const user = req.params.id;
    res.send(`UserID : ${user}`)
})

// post method
app.post('/submit', (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).send('Name and Email are required');
    }
    res.send(`Name: ${name}, Email: ${email}`);
});

// redirect  navigate another page 
app.get("/redirect", (req, res) => {
    res.redirect("https://ats-dev.techenablers.info/")
})

//  This function tells your Express application to start listening for HTTP requests on the specified port.

app.listen(port, () => {
    console.log(`server running http://localhost:${port}/`)
})