const express = require('express');
const app = express();
const port = process.env.PORT || 4000

// this is a data 
const userDetail = [
    { id: 1, first: "Muhammad", Last: "Awais" },
    { id: 2, first: "Ali", Last: "Asger" },
    { id: 3, first: "Ali", Last: "Akbar" },
    { id: 4, first: "Muhammad", Last: "Ajmal" },
    { id: 5, first: "Muhammad", Last: "Hasan" },
    { id: 6, first: "Zeeshan", Last: "Maqbool" },
    { id: 7, first: "Muhammad", Last: "Raheel" }
]

// this is simple get api
app.get('/', (req, res) => {
    res.send("welcome to this getMethod page")
})

// get all user 
app.get('/get/user', (req, res) => {
    res.send(userDetail)
})

// get user with id base 
app.get('/get/user/:id', (req, res) => {
    const searchById = parseInt(req.params.id)
    console.log("searchID==>", typeof (searchById))
    if (!searchById) return res.status(400).res.send({ msg: "this id not exists" })
    const result = userDetail.find((user) => user.id === searchById)
    console.log("filter result==>", result)
    res.send(result)
})

// search with query parm 
app.get('/search/user', (req, res) => {
    const searchByname = req.query.name
    console.log("name==>", searchByname)

    if (searchByname) {

        const result = userDetail.filter((user) => user.first.toLowerCase() === searchByname.toLowerCase());
        console.log("result==>", result);

        if (result.length > 0) {
            res.send(result);
        } else {
            res.status(404).send({ msg: "No users found with that name" });
        }
    } else {
        res.status(400).send({ msg: "No name query provided" });
    }
})

// handel multi path segment
app.get('/api/v1/:resource/:id', (req, res) => {
    const { resource, id } = req.params

    res.send(`Resource: ${resource} , ID :${id}`)
})

// get current date
app.get('/today', (req, res) => {
    const today = new Date().toDateString();
    res.send(`Today is ${today}`);
});

app.listen(port, () => {
    console.log(`server running on this http://localhost:${port}/`)
})