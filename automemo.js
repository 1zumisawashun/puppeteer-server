const express = require("express");
const router = express.Router();
const puppeteer = require("puppeteer-core");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.json());
app.use(cors());

const yodobashicameraAutomemo = [];
const biccameraAutomemo = [];
const yamadadenkiAutomemo = [];
const nojimaAutomemo = [];
const edionAutomemo = [];
const joshinAutomemo = [];
const ksAutomemo = [];
const kakakucomAutomemo = [];
const rakutenAutomemo = [];
const paypayAutomemo = [];

//-------------------------------------------------------------------------------

(async () => {
  const browser = await puppeteer.launch({
     executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    slowMo: 2000 /* 各操作の前に入れる遅延(ms)を設定 */,
    headless: false,
    //timeout: 10000,
    args: [
      // "--disable-gpu",
      // "--disable-dev-shm-usage",
      // "--disable-setuid-sandbox",
      // "--no-first-run",
      // "--no-sandbox",
      // "--no-zygote",
      // "--single-process",
    ],
  });
  //headlessをfalseにしないと動作しない
  const page = await browser.newPage();
  //await page.waitForTimeout(10000);
  await page.setDefaultNavigationTimeout(0);
  //これでセットタイムアウトを無効化している
  await page.goto("https://www.yodobashi.com/?word=Automemo", {
    waitUntil: "networkidle2",
    // Vueのレンダリングを待つ
  });
  const postPrices = await page.evaluate(() => {
    const prices = document.querySelectorAll("li .productPrice"); // セレクタを指定して記事リンクを取得
    let getPrices = [];
    for (let price of prices) {
      getPrices.push({ price: price.textContent });
      //プロパティをつける＝オブジェクトにする
    }
    return getPrices;
  });
  //配列の中身を一個ずつ変数の中に入れる
  //その変数の中に該当する値を格納していく
  const postNames = await page.evaluate(() => {
    const names = document.querySelectorAll("a .pName");
    let getNames = [];
    for (let name of names) {
      getNames.push({ name: name.textContent }); // 名前を取得
    }
    return getNames;
  });
  for (let i = 0; i < postNames.length; i++) {
    yodobashicameraAutomemo.push(Object.assign(postNames[i], postPrices[i]));
  }
  //配列をオブジェクトに変換してから配列に入れ直す
  console.log(postNames);
  await browser.close();
})();

router.get("/api/yodobashicamera/Automemo", cors(), function (req, res, next) {
  res.json(yodobashicameraAutomemo);
});

//-------------------------------------------------------------------------------

(async () => {
  const browser = await puppeteer.launch({

     executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    slowMo: 2000,
    headless: false,
    //timeout: 10000,
    args: [
      // "--disable-gpu",
      // "--disable-dev-shm-usage",
      // "--disable-setuid-sandbox",
      // "--no-first-run",
      // "--no-sandbox",
      // "--no-zygote",
      // "--single-process",
    ],
  });
  //headlessをfalseにしないと動作しない
  const page = await browser.newPage();
  //await page.waitForTimeout(10000);
  await page.setDefaultNavigationTimeout(0);
  await page.goto(
    "https://www.biccamera.com/bc/category/?q=meeting+owl&sg=Automemo",
    {
      waitUntil: "networkidle2",
      // Vueのレンダリングを待つ
    }
  );

  const postPrices = await page.evaluate(() => {
    const prices = document.querySelectorAll("li .bcs_price"); // セレクタを指定して記事リンクを取得
    let getPrices = [];
    for (let price of prices) {
      getPrices.push({ price: price.textContent });
      //プロパティをつける＝オブジェクトにする
    }
    return getPrices;
  });
  //配列の中身を一個ずつ変数の中に入れる
  //その変数の中に該当する値を格納していく
  const postNames = await page.evaluate(() => {
    const names = document.querySelectorAll("p .bcs_item");
    let getNames = [];
    for (let name of names) {
      getNames.push({ name: name.textContent }); // 名前を取得
    }
    return getNames;
  });
  for (let i = 0; i < postNames.length; i++) {
    biccameraAutomemo.push(Object.assign(postNames[i], postPrices[i]));
  }
  //配列をオブジェクトに変換してから配列に入れ直す

  await browser.close();
})();

router.get("/api/biccamera/Automemo", cors(), function (req, res, next) {
  res.json(biccameraAutomemo);
});

//-------------------------------------------------------------------------------

(async () => {
  const browser = await puppeteer.launch({

     executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    slowMo: 2000,
    headless: false,
    //timeout: 10000,
    args: [
      // "--disable-gpu",
      // "--disable-dev-shm-usage",
      // "--disable-setuid-sandbox",
      // "--no-first-run",
      // "--no-sandbox",
      // "--no-zygote",
      // "--single-process",
    ],
  });
  //headlessをfalseにしないと動作しない
  const page = await browser.newPage();
  //await page.waitForTimeout(10000);
  await page.setDefaultNavigationTimeout(0);
  await page.goto(
    "https://www.yamada-denkiweb.com/search/Automemo/?path=&searchbox=1",
    {
      waitUntil: "networkidle2",
      // Vueのレンダリングを待つ
    }
  );
  const postPrices = await page.evaluate(() => {
    const prices = document.querySelectorAll("p .large"); // セレクタを指定して記事リンクを取得
    let getPrices = [];
    for (let price of prices) {
      getPrices.push({ price: price.textContent });
      //プロパティをつける＝オブジェクトにする
    }
    return getPrices;
  });
  //配列の中身を一個ずつ変数の中に入れる
  //その変数の中に該当する値を格納していく
  const postNames = await page.evaluate(() => {
    const names = document.querySelectorAll("div .item-name");
    let getNames = [];
    for (let name of names) {
      getNames.push({ name: name.textContent }); // 名前を取得
    }
    return getNames;
  });
  for (let i = 0; i < postNames.length; i++) {
    yamadadenkiAutomemo.push(Object.assign(postNames[i], postPrices[i]));
  }
  //配列をオブジェクトに変換してから配列に入れ直す

  await browser.close();
})();

router.get("/api/yamadadenki/Automemo", cors(), function (req, res, next) {
  res.json(yamadadenkiAutomemo);
});

//-------------------------------------------------------------------------------

(async () => {
  const browser = await puppeteer.launch({

     executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    slowMo: 2000,
    headless: false,
    //timeout: 10000,
    args: [
      // "--disable-gpu",
      // "--disable-dev-shm-usage",
      // "--disable-setuid-sandbox",
      // "--no-first-run",
      // "--no-sandbox",
      // "--no-zygote",
      // "--single-process",
    ],
  });
  //headlessをfalseにしないと動作しない
  const page = await browser.newPage();
  //await page.waitForTimeout(10000);
  await page.setDefaultNavigationTimeout(0);
  await page.goto(
    "https://online.nojima.co.jp/app/catalog/list/init?searchCategoryCode=0&searchMethod=0&searchWord=automemo",
    {
      waitUntil: "networkidle2",
      // Vueのレンダリングを待つ
    }
  );
  const postPrices = await page.evaluate(() => {
    const prices = document.querySelectorAll("div .price"); // セレクタを指定して記事リンクを取得
    let getPrices = [];
    for (let price of prices) {
      getPrices.push({ price: price.innerHTML });
      //プロパティをつける＝オブジェクトにする
    }
    return getPrices;
  });
  //配列の中身を一個ずつ変数の中に入れる
  //その変数の中に該当する値を格納していく
  const postNames = await page.evaluate(() => {
    const names = document.querySelectorAll("div .textOverflowShohinmei");
    let getNames = [];
    for (let name of names) {
      getNames.push({ name: name.textContent }); // 名前を取得
    }
    return getNames;
  });
  for (let i = 0; i < postNames.length; i++) {
    nojimaAutomemo.push(Object.assign(postNames[i], postPrices[i]));
  }
  //配列をオブジェクトに変換してから配列に入れ直す
  await browser.close();
})();

router.get("/api/nojima/Automemo", cors(), function (req, res, next) {
  res.json(nojimaAutomemo);
});

//-------------------------------------------------------------------------------

(async () => {
  const browser = await puppeteer.launch({

     executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    slowMo: 2000,
    headless: false,
    //timeout: 10000,
    args: [
      // "--disable-gpu",
      // "--disable-dev-shm-usage",
      // "--disable-setuid-sandbox",
      // "--no-first-run",
      // "--no-sandbox",
      // "--no-zygote",
      // "--single-process",
    ],
  });
  //headlessをfalseにしないと動作しない
  const page = await browser.newPage();
  //await page.waitForTimeout(10000);
  await page.setDefaultNavigationTimeout(0);
  await page.goto("https://www.edion.com/item_list.html?keyword=Automemo", {
    waitUntil: "networkidle2",
    // Vueのレンダリングを待つ
  });
  const postPrices = await page.evaluate(() => {
    const prices = document.querySelectorAll("li .price2"); // セレクタを指定して記事リンクを取得
    let getPrices = [];
    for (let price of prices) {
      getPrices.push({ price: price.textContent });
      //プロパティをつける＝オブジェクトにする
    }
    return getPrices;
  });
  //配列の中身を一個ずつ変数の中に入れる
  //その変数の中に該当する値を格納していく
  const postNames = await page.evaluate(() => {
    const names = document.querySelectorAll("li .item");
    let getNames = [];
    for (let name of names) {
      getNames.push({ name: name.textContent }); // 名前を取得
    }
    return getNames;
  });
  for (let i = 0; i < postNames.length; i++) {
    edionAutomemo.push(Object.assign(postNames[i], postPrices[i]));
  }
  //配列をオブジェクトに変換してから配列に入れ直す
  await browser.close();
})();

router.get("/api/edion/Automemo", cors(), function (req, res, next) {
  res.json(edionAutomemo);
});

//-------------------------------------------------------------------------------

(async () => {
  const browser = await puppeteer.launch({

     executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    slowMo: 2000,
    headless: false,
    //timeout: 10000,
    args: [
      // "--disable-gpu",
      // "--disable-dev-shm-usage",
      // "--disable-setuid-sandbox",
      // "--no-first-run",
      // "--no-sandbox",
      // "--no-zygote",
      // "--single-process",
    ],
  });
  //headlessをfalseにしないと動作しない
  const page = await browser.newPage();
  //await page.waitForTimeout(10000);
  await page.setDefaultNavigationTimeout(0);
  await page.goto(
    "https://kakaku.com/item/K0001314464/?lid=pc_ksearch_kakakuitem",
    {
      waitUntil: "networkidle2",
      // Vueのレンダリングを待つ
    }
  );
  const postPrices = await page.evaluate(() => {
    const prices = document.querySelectorAll("div .p-PTPrice_price"); // セレクタを指定して記事リンクを取得
    let getPrices = [];
    for (let price of prices) {
      getPrices.push({ price: price.textContent });
      //プロパティをつける＝オブジェクトにする
    }
    return getPrices;
  });
  //配列の中身を一個ずつ変数の中に入れる
  //その変数の中に該当する値を格納していく
  const postNames = await page.evaluate(() => {
    const names = document.querySelectorAll("p .p-PTShopData_name_link");
    let getNames = [];
    for (let name of names) {
      getNames.push({ company: name.textContent }); // 名前を取得
    }
    return getNames;
  });
  for (let i = 0; i < postNames.length; i++) {
    kakakucomAutomemo.push(Object.assign(postNames[i], postPrices[i]));
  }

  //配列をオブジェクトに変換してから配列に入れ直す
  await browser.close();
})();

router.get("/api/kakakucom/Automemo", cors(), function (req, res, next) {
  res.json(kakakucomAutomemo);
});

//-------------------------------------------------------------------------------

(async () => {
  const browser = await puppeteer.launch({

     executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    slowMo: 2000,
    headless: false,
    //timeout: 10000,
    args: [
      // "--disable-gpu",
      // "--disable-dev-shm-usage",
      // "--disable-setuid-sandbox",
      // "--no-first-run",
      // "--no-sandbox",
      // "--no-zygote",
      // "--single-process",
    ],
  });
  //headlessをfalseにしないと動作しない
  const page = await browser.newPage();
  //await page.waitForTimeout(10000);
  await page.setDefaultNavigationTimeout(0);
  await page.goto(
    "https://product.rakuten.co.jp/product/-/4a160d6102655e4c65d5012f430753fc/item/?l2-id=pdt_item_more#price_compare",
    {
      waitUntil: "networkidle2",
      // Vueのレンダリングを待つ
    }
  );
  const postPrices = await page.evaluate(() => {
    const prices = document.querySelectorAll("td .itemPrice3"); // セレクタを指定して記事リンクを取得
    let getPrices = [];
    for (let price of prices) {
      getPrices.push({ price: price.textContent });
      //プロパティをつける＝オブジェクトにする
    }
    return getPrices;
  });
  //配列の中身を一個ずつ変数の中に入れる
  //その変数の中に該当する値を格納していく
  const postNames = await page.evaluate(() => {
    const names = document.querySelectorAll("td .shop_link");
    let getNames = [];
    for (let name of names) {
      getNames.push({ company: name.textContent }); // 名前を取得
    }
    return getNames;
  });
  for (let i = 0; i < postNames.length; i++) {
    rakutenAutomemo.push(Object.assign(postNames[i], postPrices[i]));
  }
  //配列をオブジェクトに変換してから配列に入れ直す
  await browser.close();
})();

router.get("/api/rakuten/Automemo", cors(), function (req, res, next) {
  res.json(rakutenAutomemo);
});

//-------------------------------------------------------------------------------

(async () => {
  const browser = await puppeteer.launch({

     executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    slowMo: 2000,
    //↑を有効にしていないからOwlと同じタイミングでwebAPIに反映される
    headless: false,
    //timeout: 10000,
    args: [
      // "--disable-gpu",
      // "--disable-dev-shm-usage",
      // "--disable-setuid-sandbox",
      // "--no-first-run",
      // "--no-sandbox",
      // "--no-zygote",
      // "--single-process",
    ],
  });
  //headlessをfalseにしないと動作しない
  const page = await browser.newPage();
  //await page.waitForTimeout(10000);
  await page.setDefaultNavigationTimeout(0);
  await page.goto(
    "https://paypaymall.yahoo.co.jp/search?p=AM1WH&cid=&brandid=&kspec=&b=1",
    {
      waitUntil: "networkidle2",
      // Vueのレンダリングを待つ
    }
  );
  const postPrices = await page.evaluate(() => {
    const prices = document.querySelectorAll("p .ListItem_price"); // セレクタを指定して記事リンクを取得
    let getPrices = [];
    for (let price of prices) {
      getPrices.push({ price: price.textContent });
      //プロパティをつける＝オブジェクトにする
    }
    return getPrices;
  });
  //配列の中身を一個ずつ変数の中に入れる
  //その変数の中に該当する値を格納していく
  const postNames = await page.evaluate(() => {
    const names = document.querySelectorAll("div .ListItem_seller");
    let getNames = [];
    for (let name of names) {
      getNames.push({ company: name.textContent }); // 名前を取得
    }
    return getNames;
  });
  for (let i = 0; i < postNames.length; i++) {
    paypayAutomemo.push(Object.assign(postNames[i], postPrices[i]));
  }
  console.log(postNames);
  console.log(postPrices);
  console.log("実行が完了しました！！")
  //配列をオブジェクトに変換してから配列に入れ直す
  await browser.close();
})();

router.get("/api/paypay/Automemo", cors(), function (req, res, next) {
  res.json(paypayAutomemo);
});

//-------------------------------------------------------------------------------

module.exports = router;
