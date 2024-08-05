const express = require('express');
const app = express();
const port = 5000;

const users = [
    { id: 1, name: "Ali", display: "editor" },
    { id: 2, name: "Ahmad", display: "designer" },
    { id: 3, name: "Bilal", display: "tester" }
]
const comments = [
    {
        "postId": 1,
        "id": 1,
        "name": "id labore ex et quam laborum",
        "email": "Eliseo@gardner.biz",
        "body": "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium"
    },
    {
        "postId": 1,
        "id": 2,
        "name": "quo vero reiciendis velit similique earum",
        "email": "Jayne_Kuhic@sydney.com",
        "body": "est natus enim nihil est dolore omnis voluptatem numquam\net omnis occaecati quod ullam at\nvoluptatem error expedita pariatur\nnihil sint nostrum voluptatem reiciendis et"
    },
    {
        "postId": 1,
        "id": 3,
        "name": "odio adipisci rerum aut animi",
        "email": "Nikita@garfield.biz",
        "body": "quia molestiae reprehenderit quasi aspernatur\naut expedita occaecati aliquam eveniet laudantium\nomnis quibusdam delectus saepe quia accusamus maiores nam est\ncum et ducimus et vero voluptates excepturi deleniti ratione"
    },
    {
        "postId": 1,
        "id": 4,
        "name": "alias odio sit",
        "email": "Lew@alysha.tv",
        "body": "non et atque\noccaecati deserunt quas accusantium unde odit nobis qui voluptatem\nquia voluptas consequuntur itaque dolor\net qui rerum deleniti ut occaecati"
    },
    {
        "postId": 1,
        "id": 5,
        "name": "vero eaque aliquid doloribus et culpa",
        "email": "Hayden@althea.biz",
        "body": "harum non quasi et ratione\ntempore iure ex voluptates in ratione\nharum architecto fugit inventore cupiditate\nvoluptates magni quo et"
    },
    {
        "postId": 2,
        "id": 6,
        "name": "et fugit eligendi deleniti quidem qui sint nihil autem",
        "email": "Presley.Mueller@myrl.com",
        "body": "doloribus at sed quis culpa deserunt consectetur qui praesentium\naccusamus fugiat dicta\nvoluptatem rerum ut voluptate autem\nvoluptatem repellendus aspernatur dolorem in"
    },
    {
        "postId": 2,
        "id": 7,
        "name": "repellat consequatur praesentium vel minus molestias voluptatum",
        "email": "Dallas@ole.me",
        "body": "maiores sed dolores similique labore et inventore et\nquasi temporibus esse sunt id et\neos voluptatem aliquam\naliquid ratione corporis molestiae mollitia quia et magnam dolor"
    }
]

app.get('', (req, res) => {
    res.send("welcome to Home page")
})

app.get('/api/users', (req, res) => {
    res.send(users)
})

app.get('/api/users/:id', (req, res) => {
    console.log("params ===>", req.params)
    const parseID = parseInt(req.params.id)
    console.log("this is parseID", parseID)
    if (isNaN(parseID)) return res.status(400).send({ msg: "Bad request .invalid ID" })

    const findUser = users.find((user) => user.id === parseID)
    if (!findUser) return res.status(401).send({ msg: "user not exists" })
    res.send(findUser)
})


app.get('/api/products', (req, res) => {
    const products = [
        { id: 1, item: "chicken Broast", unitPrice: 120 },
        { id: 2, item: "sandwich", unitPrice: 80 },
        { id: 2, item: "cock", unitPrice: 50 }
    ];

    res.send(products)
})


app.get('/search', (req, res) => {
    const quaryParam = req.query.q;

    if (!quaryParam) return res.send(comments)

    const result = comments.find((data) => data.name.toLowerCase().includes(quaryParam.toLowerCase()))
    res.send(result)
});



app.listen(port, () => {
    console.log(`server is running at http://localhost:${port}/`)
})