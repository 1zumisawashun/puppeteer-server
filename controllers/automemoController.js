const { productScraping } = require("../middleware/scrapingMiddleware");
const {
  yodobashi,
  bic,
  yamada,
  nojima,
  edion,
  kakakucom,
  rakuten,
  paypay,
} = require("../datas/automemo");

const yodobashiApi = async (req, res) => {
  const result = await productScraping(yodobashi);
  res.json(result);
};
const bicApi = async (req, res) => {
  const result = await productScraping(bic);
  res.json(result);
};
const yamadaApi = async (req, res) => {
  const result = await productScraping(yamada);
  res.json(result);
};
const nojimaApi = async (req, res) => {
  const result = await productScraping(nojima);
  res.json(result);
};
const edionApi = async (req, res) => {
  const result = await productScraping(edion);
  res.json(result);
};
const kakakucomApi = async (req, res) => {
  const result = await productScraping(kakakucom);
  res.json(result);
};
const rakutenApi = async (req, res) => {
  const result = await productScraping(rakuten);
  res.json(result);
};
const paypayApi = async (req, res) => {
  const result = await productScraping(paypay);
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
