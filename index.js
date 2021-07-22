const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const automemo = require("./automemo");
const meetingowl = require("./meetingowl");

app.use("/", automemo);
app.use("/", meetingowl);
app.use(bodyParser.json());
app.use(cors());

/* 2. listen()メソッドを実行して3000番ポートで待ち受け。*/
var server = app.listen(3000, function () {
  console.log("Node.js is listening to PORT:" + server.address().port);
});
