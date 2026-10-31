import express from "express";

const app = express();
app.use(express.json());

let tasks = [
  { id: 1, title: "Learn Express", status: "done" },
  { id: 2, title: "Build login", status: "todo" },
];
let nextId = 3;

app.get("/", (req, res) => res.send("TaskFlow API is running"));

app.get("/api/tasks", (req, res) => {
  const { status } = req.query;
  res.json(status ? tasks.filter((t) => t.status === status) : tasks);
});

app.post("/api/tasks", (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ message: "Title is required" });
  const task = { id: nextId++, title, status: "todo" };
  tasks.push(task);
  res.status(201).json(task);
});

app.patch("/api/tasks/:id", (req, res) => {
  const task = tasks.find((t) => t.id === Number(req.params.id));
  if (!task) return res.status(404).json({ message: "Task not found" });
  Object.assign(task, req.body);
  res.json(task);
});

app.delete("/api/tasks/:id", (req, res) => {
  const i = tasks.findIndex((t) => t.id === Number(req.params.id));
  if (i === -1) return res.status(404).json({ message: "Task not found" });
  tasks.splice(i, 1);
  res.status(204).send();
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));