const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const automemo = require("./automemo");
//const meetingowl = require("./meetingowl");
const morgan = require("morgan");
const blogRoutes = require("./routes/blogRoutes");

//register view engine
app.set("view engine", "ejs");

app.use("/", automemo);
//app.use("/", meetingowl);
app.use(bodyParser.json());
app.use(cors());
//add scoped
app.use("/blogs", blogRoutes);
//use middleware
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

/* 2. listen()メソッドを実行して3000番ポートで待ち受け。*/
var server = app.listen(3000, function () {
  console.log("Node.js is listening to PORT:" + server.address().port);
});

//listen for request
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

//redirect test
app.get("/about-us", (req, res) => {
  res.redirect("/about");
});
