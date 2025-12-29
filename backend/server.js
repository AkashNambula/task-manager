const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let tasks = [];
let idCounter = 1;

// GET all tasks
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// ADD new task
app.post("/tasks", (req, res) => {
  const task = {
    id: idCounter++,
    title: req.body.title,
    description: req.body.description
  };
  tasks.push(task);
  res.json(task);
});

// UPDATE task
app.put("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find(t => t.id === id);

  if (task) {
    task.title = req.body.title;
    task.description = req.body.description;
    res.json(task);
  } else {
    res.status(404).send("Task not found");
  }
});

// DELETE task
app.delete("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  tasks = tasks.filter(t => t.id !== id);
  res.send("Deleted");
});

// START server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
