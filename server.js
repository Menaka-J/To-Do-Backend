const express = require("express");
const mongoose = require("mongoose");
const PORT = 3000;
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello WORLD!");
});

//creating item
// let todolist = [];

//connecting mongodb
mongoose.connect('mongodb://localhost:27017/mern-app')
    .then(() => {
        console.log("MongoDB connected")
    })
    .catch((err) => {
        console.log(err)
    })
//creating schema
const todoschema = new mongoose.Schema({
    title: String,
    description: String
})

const todomodel = mongoose.model("ToDo", todoschema);

// app.post("/todos", async (req, res) => {
//     const { title, description } = req.body;
//     // const newitem = {
//     //     id: todolist.length + 1,
//     //     title,
//     //     description
//     // };
//     // todolist.push(newitem);
//     // console.log(newitem);
//     try {
//         const newtodo = new todomodel({ title, description });
//         await newtodo.save();
//         res.send(201).json({ message: "Item added ", data: newtodo });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: "Server error" });
//     }
// });

// //getting item
// app.get("/todos", (req, res) => {
//     res.json(todolist);
// });

app.post("/todos", async (req, res) => {
    const { title, description } = req.body;

    try {
        const newtodo = new todomodel({ title, description });
        await newtodo.save();

        res.status(201).json({
            message: "Item added",
            data: newtodo
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
});

//starting the server
app.listen(PORT, () => {
    console.log("Server is listening to port" + PORT);
});
