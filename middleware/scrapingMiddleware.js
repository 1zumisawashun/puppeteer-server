const puppeteer = require("puppeteer-core");
const executablePath =
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const scraping = async (shop) => {
  const browser = await puppeteer.launch({
    executablePath: executablePath,
    // slowMo: 50,
    headless: true,
  });
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
  await page.goto(shop.url, {
    waitUntil: "networkidle2",
  });

  // NOTE:商品価格のスクレイピング
  const priceDatas = await page.evaluate((selector) => {
    const list = Array.from(document.querySelectorAll(selector));
    return list.map((data, index) => {
      return {
        id: index,
        price: data.textContent,
      };
    });
  }, shop.pricePath);

  // NOTE:商品名のスクレイピング
  const nameDatas = await page.evaluate((selector) => {
    const list = Array.from(document.querySelectorAll(selector));
    return list.map((data, index) => {
      return {
        id: index,
        name: data.textContent,
      };
    });
  }, shop.namePath);

  // NOTE:プロパティアクセスできるように加工する
  const formatNameDatas = nameDatas.reduce(
    (accumulator, currentValue, index) => {
      accumulator[index] = currentValue;
      return accumulator;
    },
    {}
  );

  // NOTE:一致するオブジェクトをマージさせる
  const result = priceDatas.map((el) => {
    return formatNameDatas[el.id]
      ? { ...formatNameDatas[el.id], price: el.price }
      : "データが取得できませんでした";
  });

  await browser.close();
  return result;
};

module.exports = { scraping };
