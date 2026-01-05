const express = require("express");
const mongoose = require("mongoose");
const PORT = 8000;
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
    title: {
        required: true,
        type: String
    },
    description: String
})

const todomodel = mongoose.model("ToDo", todoschema);

//creating item
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
        res.status(500).json({ message: error.message });
    }
});

//getting item
app.get("/todos", async (req, res) => {
    try {
        const todoitems = await todomodel.find();
        res.json(todoitems);
    }
    catch (error) {
        console.log(error)
        res.send(500).json({ message: error.message });
    }
});

//updating item
app.put("/todos/:id", async (req, res) => {
    try {
        const { title, description } = req.body;
        const id = req.params.id;
        const updatedtodo = await todomodel.findByIdAndUpdate(
            id,
            { title, description },
            { new: true }
        );
        if (!updatedtodo) {
            return res.status(404).json({ message: "Todo not found" });
        }
        res.json(updatedtodo)
    } catch (error) {
        console.log(error)
        res.send(500).json({ message: error.message });
    }
});

//deleting item
app.delete("/todos/:id", async (req, res) => {

    try {
        const id = req.params.id;
        await todomodel.findByIdAndDelete(id);
        res.status(204).end();
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
});

//starting the server
app.listen(PORT, () => {
    console.log("Server is listening to port" + PORT);
});




//==================================================
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
