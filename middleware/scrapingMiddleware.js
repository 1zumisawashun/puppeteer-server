const puppeteer = require("puppeteer-core");
const executablePath =
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const scraping = async (shop) => {
  const browser = await puppeteer.launch({
    executablePath: executablePath,
    slowMo: 500,
    headless: false,
  });
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
  await page.goto(shop.url, {
    waitUntil: "networkidle2",
  });

  // scraping
  const priceSelector = await page.$$(shop.pricePath);
  const nameSelector = await page.$$(shop.namePath);
  const resultArray = [];

  for (let i = 0; i < priceSelector.length; i++) {
    const data = {
      price: await (
        await priceSelector[i].getProperty("textContent")
      ).jsonValue(),
      name: await (
        await nameSelector[i].getProperty("textContent")
      ).jsonValue(),
    };
    resultArray.push(data);
  }

  await browser.close();
  console.log(resultArray, "check resultArray");
  return resultArray;
};

module.exports = { scraping };
