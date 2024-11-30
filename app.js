const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

const blogRoutes = require("./routes/blogRoutes");

// express app
const app = express();

// connect to MongoDB

const dbURI =
  "mongodb+srv://user1:user1@node-learning.xvcu3.mongodb.net/node-app?retryWrites=true&w=majority&appName=node-learning";
mongoose
  .connect(dbURI)
  .then((result) => {
    // listen for requests
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });

// register view engine

app.set("view engine", "ejs");

// middleware and static files

app.use(express.static("public"));
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));

// routes

app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

// blog routes

app.use(blogRoutes);

// 404 Page

app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
