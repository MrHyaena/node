const express = require("express");

// express app
const app = express();

// register view engine

app.set("view engine", "ejs");

// listen for requests

app.listen(3000);

app.get("/", (req, res) => {
  const blogs = [
    { title: "Yoshi", snippet: "Lorem ipsum dolor sit amet consectetur" },
    { title: "Yoshi", snippet: "Lorem ipsum dolor sit amet consectetur" },
    { title: "Yoshi", snippet: "Lorem ipsum dolor sit amet consectetur" },
  ];
  res.render("index", { title: "Home", blogs: blogs });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
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
