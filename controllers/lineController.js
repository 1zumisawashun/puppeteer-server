const { handleEvent } = require("../middleware/lineMiddleware");

// ルーター設定
const line_post = (req, res) => {
  // 先行してLINE側にステータスコード200でレスポンスする。
  const events = req.body.events;
  console.log(events, "check web hook event");
  events.map(handleEvent);
};

module.exports = {
  line_post,
};
