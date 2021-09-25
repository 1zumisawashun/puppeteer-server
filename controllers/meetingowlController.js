const { scraping } = require("../middleware/scrapingMiddleware");
const {
  yodobashi,
  bic,
  yamada,
  nojima,
  edion,
  kakakucom,
  rakuten,
  paypay,
} = require("../model/meetingowl");

const yodobashiApi = async (req, res) => {
  const result = await scraping(yodobashi);
  res.json(result);
};
const bicApi = async (req, res) => {
  const result = await scraping(bic);
  res.json(result);
};
const yamadaApi = async (req, res) => {
  const result = await scraping(yamada);
  res.json(result);
};
const nojimaApi = async (req, res) => {
  const result = await scraping(nojima);
  res.json(result);
};
const edionApi = async (req, res) => {
  const result = await scraping(edion);
  res.json(result);
};
const kakakucomApi = async (req, res) => {
  const result = await scraping(kakakucom);
  res.json(result);
};
const rakutenApi = async (req, res) => {
  const result = await scraping(rakuten);
  res.json(result);
};
const paypayApi = async (req, res) => {
  const result = await scraping(paypay);
  res.json(result);
};

module.exports = {
  yodobashiApi,
  bicApi,
  yamadaApi,
  nojimaApi,
  edionApi,
  kakakucomApi,
  rakutenApi,
  paypayApi,
};
