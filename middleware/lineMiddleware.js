const line = require("@line/bot-sdk");
require("dotenv").config();
const config = {
  channelSecret: process.env.LINE_CHANNEL_SECRET,
  channelAccessToken: process.env.LINE_ACCESS_TOKEN,
};
const client = new line.Client(config);

const handleEvent = async (event) => {
  // メッセージでなければ返信しない
  if (event.type !== "message" || event.message.type !== "text") {
    return null;
  }
  // 返信用メッセージを作成
  await client.replyMessage(event.replyToken, {
    type: "text",
    text: event.message.text,
  });
};

module.exports = { handleEvent };
