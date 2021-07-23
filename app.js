const express = require("express");
const app = express();
const morgan = require("morgan");
const firebase = require("./plugins/firebase");
const db = firebase.firestore();

//register view engine
app.set("view engine", "ejs");

//use middleware
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

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
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});
app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create a new Blog" });
});

//connect firebase
app.get("/blogs", (req, res) => {
  db.collection("request")
    .get()
    .then((querySnapshot) => {
      const blogs = [];
      querySnapshot.forEach((doc) => {
        blogs.push({ id: doc.id, ...doc.data() });
      });
      res.render("index", { title: "All Blogs", blogs: blogs });
    })
    .catch((error) => {
      console.log(error);
    });
});
app.get("/blogs/:id", (req, res) => {
  console.log(req.params.id);
  db.collection("request")
    .doc(req.params.id)
    .get()
    .then((docSnapshot) => {
      console.log(docSnapshot.data());
      res.render("detail", { title: "Detail Blog", blog: docSnapshot.data() });
    })
    .catch((error) => {
      console.log(error);
    });
});
app.post("/blogs", (req, res) => {
  db.collection("request")
    .add({
      title: req.body.title,
      snippet: req.body.snippet,
      body: req.body.body,
    })
    .then((result) => {
      res.redirect("/blogs");
    })
    .catch((error) => {
      console.log(error);
    });
});

//redirect
app.get("/about-us", (req, res) => {
  res.redirect("/about");
});

//404 page
app.use((req, res) => {
  res.render("404", { title: "404" });
});

//listen port 3000
var server = app.listen(3000, function () {
  console.log("Node.js is listening to my PORT:" + server.address().port);
});
