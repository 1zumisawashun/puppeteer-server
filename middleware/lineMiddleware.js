const { scraping } = require("./scrapingMiddleware");
const { yamada } = require("../datas/automemo");

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
  // スクレイピングの結果を取得
  const result = await scraping(yamada);
  // 返信用メッセージを作成（タイプに合わせて整形しなくてはいけない）
  await client.replyMessage(event.replyToken, {
    type: "text",
    text: result[0].price,
  });
};

module.exports = { handleEvent };
