const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
//const automemo = require("./automemo");
//const meetingowl = require("./meetingowl");
const morgan = require("morgan");
const blogRoutes = require("./routes/blogRoutes");
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");

//register view engine
app.set("view engine", "ejs");

//app.use("/", automemo);
//app.use("/", meetingowl);
app.use(bodyParser.json());
//for auth json pause
app.use(express.json());
//instead body-parser
app.use(cookieParser());

app.use(cors());
//add scoped
app.use("/blogs", blogRoutes);
app.use(authRoutes);
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

//set-cookies
app.get("/set-cookies", (req, res) => {
  res.cookie("newUser", false);
  res.cookie("isEmployee", true, {
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true,
  });
  res.send("you got a cookies");
});

//read-cookies
app.get("/read-cookies", (req, res) => {
  const cookies = req.cookies;
  console.log(cookies.newUser);
  res.json(cookies);
});
