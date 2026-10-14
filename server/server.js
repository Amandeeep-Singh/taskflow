import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello from my first server!");
});

app.get("/api/tasks", (req, res) => {
  res.json([
    { id: 1, title: "Learn Express", status: "done" },
    { id: 2, title: "Build login", status: "todo" },
  ]);
});

app.get("/api/about", (req, res) => {
  res.json({ name: "TaskFlow", version: 1 });
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});