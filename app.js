const express = require("express");
const app = express();
const morgan = require("morgan");
const blogRoutes = require("./routes/blogRoutes");

//register view engine
app.set("view engine", "ejs");

//use middleware
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

//listen for request
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});
//add scoped
app.use("/blogs", blogRoutes);

//redirect test
app.get("/about-us", (req, res) => {
  res.redirect("/about");
});

//404 page
app.use((req, res) => {
  res.render("404", { title: "Blog not Found" });
});

//listen port 3000
var server = app.listen(3000, function () {
  console.log("Node.js is listening to my PORT:" + server.address().port);
});
