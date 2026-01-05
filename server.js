const express = require("express");
const PORT = 3000;
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello WORLD!");
});

//creating item
let todolist = [];

app.post("/todos", (req, res) => {
    const { title, description } = req.body;
    const newitem = {
        id: todolist.length + 1,
        title,
        description
    };
    todolist.push(newitem);
    console.log(newitem);
    res.status(201).json(newitem);
});

//getting item
app.get("/todos", (req, res) => {
    res.json(todolist);
});


//starting the server
app.listen(PORT, () => {
    console.log("Server is listening to port" + PORT);
});
