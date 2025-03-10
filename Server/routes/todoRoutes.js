const express = require("express");
const Todo = require("../models/Todo");

const router = express.Router();

// ✅ 1. Get all todos
router.get("/todos", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

// ✅ 2. Add a new todo
router.post("/todos", async (req, res) => {
  const newTodo = new Todo({ task: req.body.task });
  await newTodo.save();
  res.json(newTodo);
});

// ✅ 3. Update a todo (Fixed)
router.put("/todos/:id", async (req, res) => {
  try {
    const { task, completed } = req.body;  
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      { task, completed },  
      { new: true }
    );
    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ message: "Error updating todo" });
  }
});

// ✅ 4. Delete a todo
router.delete("/todos/:id", async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: "Todo deleted" });
});

module.exports = router;
