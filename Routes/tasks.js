import express from "express";
const router = express.Router();
let tasks = [
  { id: 1, title: "Understand OOP", status: false },
  { id: 2, title: "Learn Front-end", status: false },
  { id: 3, title: "Practice on the API", status: false },
  { id: 5, title: "Wake-up early", status: false },
  { id: 6, title: "Having breakfast", status: false },
  { id: 7, title: "Make your bed", status: false },
  { id: 8, title: "Study HTML", status: true },
  { id: 9, title: "Learn JS", status: false },
];

let taskId = 10;
const quotes = [
  {
    id: 1,
    quote: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
  },
  {
    id: 2,
    quote: "Believe you can and you're halfway there.",
    author: "Theodore Roosevelt",
  },
  {
    id: 3,
    quote:
      "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    author: "Winston Churchill",
  },
  {
    id: 4,
    quote: "Don't watch the clock; do what it does. Keep going.",
    author: "Sam Levenson",
  },
  {
    id: 5,
    quote: "It always seems impossible until it's done.",
    author: "Nelson Mandela",
  },
  {
    id: 6,
    quote: "Dream big and dare to fail.",
    author: "Norman Vaughan",
  },
  {
    id: 7,
    quote:
      "The harder you work for something, the greater you’ll feel when you achieve it.",
    author: "Winston Churchill",
  },
  {
    id: 8,
    quote: "Push yourself, because no one else is going to do it for you.",
    author: "Norman Vaughan",
  },
  {
    id: 9,
    quote: "Great things never come from comfort zones.",
    author: "Jerry Dunn",
  },
  {
    id: 10,
    quote: "Don't limit your challenges. Challenge your limits.",
    author: "Jerry Dunn",
  },
];
router.get("/", (req, res) => {
  const randomQuotes = Math.floor(Math.random() * quotes.length);
  const theQuote = quotes[randomQuotes];
  res.render("index.ejs", { tasks: tasks, theQuote: theQuote });
});

router.post("/submit", (req, res) => {
  taskId++;
  let newTasks = {
    id: taskId,
    title: req.body.title,
    status: false,
  };
  tasks.push(newTasks);
  res.redirect("/index");
});
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const taskObject = tasks.find((task) => task.id === id);
  res.render("/task", { taskObject: taskObject });
});
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const taskIndex = tasks.findIndex((task) => task.id === id);
  if (taskIndex > -1) {
    tasks.splice(taskIndex, 1);
  }
  res.redirect("/task");
});

router.patch("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const taskObject = tasks.find((task) => task.id === id);
  const newTasks = {
    id: id,
    title: taskObject.title,
    status: true,
  };
  const taskIndex = tasks.findIndex((task) => task.id === id);
  tasks[taskIndex] = newTasks;
  res.redirect("/task");
});
router.patch("/:id/edit", (req, res) => {
  const id = parseInt(req.params.id);
  const taskObject = tasks.find((task) => task.id === id);
  const newTasks = {
    id: id,
    title: req.body.title,
    status: false,
  };
  const taskIndex = tasks.findIndex((task) => task.id === id);
  tasks[taskIndex] = newTasks;
  res.render("/task", { newTasks: newTasks });
});

router.delete("/all", (req, res) => {
  tasks = [];
  res.redirect("index");
});
export default router;
