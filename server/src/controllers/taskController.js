let tasks = [
  { id: 1, title: "Learn Express", status: "done" },
  { id: 2, title: "Build login", status: "todo" },
];
let nextId = 3;

export const getTasks = (req, res) => {
  const { status } = req.query;
  res.json(status ? tasks.filter((t) => t.status === status) : tasks);
};

export const createTask = (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ message: "Title is required" });
  const task = { id: nextId++, title, status: "todo" };
  tasks.push(task);
  res.status(201).json(task);
};

export const updateTask = (req, res) => {
  const task = tasks.find((t) => t.id === Number(req.params.id));
  if (!task) return res.status(404).json({ message: "Task not found" });
  Object.assign(task, req.body);
  res.json(task);
};

export const deleteTask = (req, res) => {
  const i = tasks.findIndex((t) => t.id === Number(req.params.id));
  if (i === -1) return res.status(404).json({ message: "Task not found" });
  tasks.splice(i, 1);
  res.status(204).send();
};