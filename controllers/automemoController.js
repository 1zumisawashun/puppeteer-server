const puppeteer = require("puppeteer-core");

const yodobashicameraAutomemo = [];
const biccameraAutomemo = [];
const yamadadenkiAutomemo = [];
const nojimaAutomemo = [];
const edionAutomemo = [];
//const joshinAutomemo = [];
//const ksAutomemo = [];
const kakakucomAutomemo = [];
const rakutenAutomemo = [];
const paypayAutomemo = [];

//-------------------------------------------------------------------------------

const yodobashi = async (req, res) => {
  const browser = await puppeteer.launch({
    executablePath:
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    slowMo: 1000 /* 各操作の前に入れる遅延(ms)を設定 */,
    headless: false,
  });
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
  await page.goto("https://www.yodobashi.com/?word=Automemo", {
    waitUntil: "networkidle2",
  });
  const postPrices = await page.evaluate(() => {
    const prices = document.querySelectorAll("li .productPrice");
    let getPrices = [];
    for (let price of prices) {
      getPrices.push({ price: price.textContent });
    }
    return getPrices;
  });
  const postNames = await page.evaluate(() => {
    const names = document.querySelectorAll("a .pName");
    let getNames = [];
    for (let name of names) {
      getNames.push({ name: name.textContent });
    }
    return getNames;
  });
  for (let i = 0; i < postNames.length; i++) {
    yodobashicameraAutomemo.push(Object.assign(postNames[i], postPrices[i]));
  }
  await browser.close();
  await res.json(yodobashicameraAutomemo);
};

//-------------------------------------------------------------------------------

const bic = async (req, res) => {
  const browser = await puppeteer.launch({
    executablePath:
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    slowMo: 1000,
    headless: false,
  });
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
  await page.goto(
    "https://www.biccamera.com/bc/category/?q=meeting+owl&sg=Automemo",
    {
      waitUntil: "networkidle2",
    }
  );
  const postPrices = await page.evaluate(() => {
    const prices = document.querySelectorAll("li .bcs_price");
    let getPrices = [];
    for (let price of prices) {
      getPrices.push({ price: price.textContent });
    }
    return getPrices;
  });
  const postNames = await page.evaluate(() => {
    const names = document.querySelectorAll("p .bcs_item");
    let getNames = [];
    for (let name of names) {
      getNames.push({ name: name.textContent });
    }
    return getNames;
  });
  for (let i = 0; i < postNames.length; i++) {
    biccameraAutomemo.push(Object.assign(postNames[i], postPrices[i]));
  }
  await browser.close();
  await res.json(biccameraAutomemo);
};

//-------------------------------------------------------------------------------
const yamada = async (req, res) => {
  const browser = await puppeteer.launch({
    executablePath:
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    slowMo: 1000,
    headless: false,
  });
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
  await page.goto(
    "https://www.yamada-denkiweb.com/search/Automemo/?path=&searchbox=1",
    {
      waitUntil: "networkidle2",
    }
  );
  const postPrices = await page.evaluate(() => {
    const prices = document.querySelectorAll("p .large");
    let getPrices = [];
    for (let price of prices) {
      getPrices.push({ price: price.textContent });
    }
    return getPrices;
  });
  const postNames = await page.evaluate(() => {
    const names = document.querySelectorAll("div .item-name");
    let getNames = [];
    for (let name of names) {
      getNames.push({ name: name.textContent });
    }
    return getNames;
  });
  for (let i = 0; i < postNames.length; i++) {
    yamadadenkiAutomemo.push(Object.assign(postNames[i], postPrices[i]));
  }
  await browser.close();
  await res.json(yamadadenkiAutomemo);
};
//-------------------------------------------------------------------------------

const nojima = async (req, res) => {
  const browser = await puppeteer.launch({
    executablePath:
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    slowMo: 1000,
    headless: false,
  });
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
  await page.goto(
    "https://online.nojima.co.jp/app/catalog/list/init?searchCategoryCode=0&searchMethod=0&searchWord=automemo",
    {
      waitUntil: "networkidle2",
    }
  );
  const postPrices = await page.evaluate(() => {
    const prices = document.querySelectorAll("div .price");
    let getPrices = [];
    for (let price of prices) {
      getPrices.push({ price: price.innerHTML });
    }
    return getPrices;
  });
  const postNames = await page.evaluate(() => {
    const names = document.querySelectorAll("div .textOverflowShohinmei");
    let getNames = [];
    for (let name of names) {
      getNames.push({ name: name.textContent });
    }
    return getNames;
  });
  for (let i = 0; i < postNames.length; i++) {
    nojimaAutomemo.push(Object.assign(postNames[i], postPrices[i]));
  }
  await browser.close();
  await res.json(nojimaAutomemo);
};

//-------------------------------------------------------------------------------
const edion = async (req, res) => {
  const browser = await puppeteer.launch({
    executablePath:
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    slowMo: 1000,
    headless: false,
  });
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
  await page.goto("https://www.edion.com/item_list.html?keyword=Automemo", {
    waitUntil: "networkidle2",
  });
  const postPrices = await page.evaluate(() => {
    const prices = document.querySelectorAll("li .price2");
    let getPrices = [];
    for (let price of prices) {
      getPrices.push({ price: price.textContent });
    }
    return getPrices;
  });
  const postNames = await page.evaluate(() => {
    const names = document.querySelectorAll("li .item");
    let getNames = [];
    for (let name of names) {
      getNames.push({ name: name.textContent });
    }
    return getNames;
  });
  for (let i = 0; i < postNames.length; i++) {
    edionAutomemo.push(Object.assign(postNames[i], postPrices[i]));
  }
  await browser.close();
  await res.json(edionAutomemo);
};
//-------------------------------------------------------------------------------
const kakakucom = async (req, res) => {
  const browser = await puppeteer.launch({
    executablePath:
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    slowMo: 1000,
    headless: false,
  });
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
  await page.goto(
    "https://kakaku.com/item/K0001314464/?lid=pc_ksearch_kakakuitem",
    {
      waitUntil: "networkidle2",
    }
  );
  const postPrices = await page.evaluate(() => {
    const prices = document.querySelectorAll("div .p-PTPrice_price");
    let getPrices = [];
    for (let price of prices) {
      getPrices.push({ price: price.textContent });
    }
    return getPrices;
  });
  const postNames = await page.evaluate(() => {
    const names = document.querySelectorAll("p .p-PTShopData_name_link");
    let getNames = [];
    for (let name of names) {
      getNames.push({ company: name.textContent });
    }
    return getNames;
  });
  for (let i = 0; i < postNames.length; i++) {
    kakakucomAutomemo.push(Object.assign(postNames[i], postPrices[i]));
  }
  await browser.close();
  await res.json(kakakucomAutomemo);
};

//-------------------------------------------------------------------------------

const rakuten = async (req, res) => {
  const browser = await puppeteer.launch({
    executablePath:
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    slowMo: 1000,
    headless: false,
  });
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
  await page.goto(
    "https://product.rakuten.co.jp/product/-/4a160d6102655e4c65d5012f430753fc/item/?l2-id=pdt_item_more#price_compare",
    {
      waitUntil: "networkidle2",
    }
  );
  const postPrices = await page.evaluate(() => {
    const prices = document.querySelectorAll("td .itemPrice3");
    let getPrices = [];
    for (let price of prices) {
      getPrices.push({ price: price.textContent });
    }
    return getPrices;
  });
  const postNames = await page.evaluate(() => {
    const names = document.querySelectorAll("td .shop_link");
    let getNames = [];
    for (let name of names) {
      getNames.push({ company: name.textContent });
    }
    return getNames;
  });
  for (let i = 0; i < postNames.length; i++) {
    rakutenAutomemo.push(Object.assign(postNames[i], postPrices[i]));
  }
  await browser.close();
  await res.json(rakutenAutomemo);
};
//-------------------------------------------------------------------------------

const paypay = async (req, res) => {
  const browser = await puppeteer.launch({
    executablePath:
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    slowMo: 1000,
    headless: false,
  });
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
  await page.goto(
    "https://paypaymall.yahoo.co.jp/search?p=AM1WH&cid=&brandid=&kspec=&b=1",
    {
      waitUntil: "networkidle2",
    }
  );
  const postPrices = await page.evaluate(() => {
    const prices = document.querySelectorAll("p .ListItem_price");
    let getPrices = [];
    for (let price of prices) {
      getPrices.push({ price: price.textContent });
    }
    return getPrices;
  });
  const postNames = await page.evaluate(() => {
    const names = document.querySelectorAll("div .ListItem_seller");
    let getNames = [];
    for (let name of names) {
      getNames.push({ company: name.textContent });
    }
    return getNames;
  });
  for (let i = 0; i < postNames.length; i++) {
    paypayAutomemo.push(Object.assign(postNames[i], postPrices[i]));
  }
  await browser.close();
  await res.json(paypayAutomemo);
};

module.exports = {
  yodobashi,
  bic,
  yamada,
  nojima,
  edion,
  kakakucom,
  rakuten,
  paypay,
};
