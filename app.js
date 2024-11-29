const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./models/blog");

// test data

const blogs = [
  { title: "Yoshi", snippet: "Lorem ipsum dolor sit amet consectetur" },
  { title: "Yoshi", snippet: "Lorem ipsum dolor sit amet consectetur" },
  { title: "Yoshi", snippet: "Lorem ipsum dolor sit amet consectetur" },
];

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

// mongoose and mongo sandbox routes
app.get("/add-blog", (req, res) => {
  const blog = new Blog({
    title: "new blog 2",
    snippet: "about my new blog",
    body: "more about my new blog",
  });

  blog
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/all-blogs", (req, res) => {
  Blog.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/single-blog", (req, res) => {
  Blog.findById("6749983e694a2fef39f10c41")
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

// routes

// app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

// app.post("/create", async (req, res) => {
//   const data = await req.body;
//   console.log(data);
//   blogs.push(data);
//   res.redirect("/");
// });

// blog routes

app.get("/blogs", (req, res) => {
  Blog.find()
    .sort({ createdAt: "desc" })
    .then((result) => {
      res.render("index", { title: "All blogs", blogs: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create Blog" });
});

// 404 Page

app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
