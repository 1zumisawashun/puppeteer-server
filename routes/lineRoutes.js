const express = require("express");
const router = express.Router();
const lineController = require("../controllers/lineController.js");
const line = require("@line/bot-sdk");
require("dotenv").config();

const config = {
  channelSecret: process.env.LINE_CHANNEL_SECRET,
  channelAccessToken: process.env.LINE_ACCESS_TOKEN,
};

router.post("/webhook", line.middleware(config), lineController.line_post);

module.exports = router;
