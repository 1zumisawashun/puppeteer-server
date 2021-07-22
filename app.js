const express = require("express");
const app = express();
const morgan = require("morgan");
const firebase = require("./plugins/firebase");

//register view engine
app.set("view engine", "ejs");

app.use(morgan("dev"));
app.use(express.static("public"));

app.use((req, res, next) => {
  console.log("new request made");
  console.log("host:", req.hostname);
  console.log("path:", req.path);
  console.log("method:", req.method);
  next();
});
app.use((req, res, next) => {
  console.log("in the next middleware");
  next();
});

//listen for request
app.get("/", (req, res) => {
  const blogs = [
    {
      title: "yoshi finds eggs",
      snippet: "lorem ipsum dolor sit amet consectetur",
    },
    {
      title: "Mario finds stars",
      snippet: "lorem ipsum dolor sit amet consectetur",
    },
    {
      title: "How to defeat bowser",
      snippet: "lorem ipsum dolor sit amet consectetur",
    },
  ];
  res.render("index", { title: "Home", blogs });
});
app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});
app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create a new Blog" });
});

//redirect
app.get("/about-us", (req, res) => {
  firebase.firestore().collection("request").add({
    text: "test",
  });
  alert("Firestoreにデータを格納しました");
  res.redirect("/about");
});
//404 page
app.use((req, res) => {
  res.render("404", { title: "404" });
});

var server = app.listen(3000, function () {
  console.log("Node.js is listening to my PORT:" + server.address().port);
});
