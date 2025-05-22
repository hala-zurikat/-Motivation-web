import express from "express";
import bodyParser from "body-parser";
import tasksPath from "./Routes/tasks.js";
import methodOverride from "method-override";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));

app.use("/task", tasksPath);

app.get("/index", (req, res) => {
  res.redirect("/task");
});
app.get("/about", (req, res) => {
  res.render("about.ejs");
});

app.listen(port, () => {
  console.log("The Server is running: 3000");
});
