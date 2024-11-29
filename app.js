const express = require("express");
const morgan = require("morgan");

// test data

const blogs = [
  { title: "Yoshi", snippet: "Lorem ipsum dolor sit amet consectetur" },
  { title: "Yoshi", snippet: "Lorem ipsum dolor sit amet consectetur" },
  { title: "Yoshi", snippet: "Lorem ipsum dolor sit amet consectetur" },
];

// express app
const app = express();

// register view engine

app.set("view engine", "ejs");

// listen for requests

app.listen(3000);

// middleware and static files

app.use(express.static("public"));
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index", { title: "Home", blogs: blogs });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.post("/create", async (req, res) => {
  const data = await req.body;
  console.log(data);
  blogs.push(data);
  res.redirect("/");
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create Blog" });
});

// redirects

app.get("/about-us", (req, res) => {
  res.redirect("/about");
});

// 404 Page

app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
