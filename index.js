const express = require("express");
const bodyParser = require("body-parser");
// corsポリシーに抵触するため、その対策としてcorsを利用する
const cors = require("cors");
const puppeteer = require("puppeteer-core");
// 1. expressモジュールをロードし、インスタンス化してappに代入。
const app = express();
const automemo = require('./automemo');
//const molekule = require('./molekule');
//const mimi = require('./mimi');
const meetingowl = require('./meetingowl');

app.use('/', automemo);
//app.use('/', molekule);
//app.use('/', mimi);
app.use('/', meetingowl);
app.use(bodyParser.json());
app.use(cors());

/* 2. listen()メソッドを実行して3000番ポートで待ち受け。*/
var server = app.listen(3000, function () {
  console.log("Node.js is listening to PORT:" + server.address().port);
});
