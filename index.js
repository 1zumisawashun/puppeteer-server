const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const listRoutes = require("./routes/listRoutes");
const authRoutes = require("./routes/authRoutes");
const automemoRoutes = require("./routes/automemoRoutes");
const meetingowlRoutes = require("./routes/meetingowlRoutes");
const cookieParser = require("cookie-parser");
const { requestAuth, checkUser } = require("./middleware/authMiddleware");
const lineRoutes = require("./routes/lineRoutes");

app.set("view engine", "ejs");

app.use(lineRoutes);
app.use("/liff", express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/lists", listRoutes);
app.use(authRoutes);
app.use("/api/automemo", automemoRoutes);
app.use("/api/meetingowl", meetingowlRoutes);

var server = app.listen(3000, function () {
  console.log("Node.js is listening to PORT:" + server.address().port);
});

app.get("*", checkUser);

app.get("/", requestAuth, (req, res) => {
  res.redirect("/lists");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
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
