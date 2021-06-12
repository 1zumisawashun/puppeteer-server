const express = require("express");
const router = express.Router();
const puppeteer = require("puppeteer-core");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.json());
app.use(cors());

const yodobashicameraMeetingowl = [];
const biccameraMeetingowl = [];
const yamadadenkiMeetingowl = [];
const nojimaMeetingowl = [];
const edionMeetingowl = [];
const joshinMeetingowl = [];
const ksMeetingowl = [];
const kakakucomMeetingowl = [];
const rakutenMeetingowl = [];
const paypayMeetingowl  = [];

//-------------------------------------------------------------------------------

(async () => {
  const browser = await puppeteer.launch({ headless: false ,
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  
    args: [
      // '--disable-gpu',
      // '--disable-dev-shm-usage',
      // '--disable-setuid-sandbox',
      // '--no-first-run',
      // '--no-sandbox',
      // '--no-zygote',
      // '--single-process'
    ]});
  //headlessをfalseにしないと動作しない
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0); 
  await page.goto("https://www.yodobashi.com/?word=meetingOwl", {
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
    yodobashicameraMeetingowl.push(Object.assign(postNames[i], postPrices[i]));
  }
  //配列をオブジェクトに変換してから配列に入れ直す
  await browser.close();
})();

router.get(
  "/api/yodobashicamera/meetingowl",
  cors(),
  function (req, res, next) {
    res.json(yodobashicameraMeetingowl);
  }
);

//-------------------------------------------------------------------------------

(async () => {
  const browser = await puppeteer.launch({ headless: false,
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  
    args: [
      // '--disable-gpu',
      // '--disable-dev-shm-usage',
      // '--disable-setuid-sandbox',
      // '--no-first-run',
      // '--no-sandbox',
      // '--no-zygote',
      // '--single-process'
    ] });
  //headlessをfalseにしないと動作しない
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0); 
  await page.goto(
    "https://www.biccamera.com/bc/category/?q=meeting+owl&sg=Meetingowl",
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
    biccameraMeetingowl.push(Object.assign(postNames[i], postPrices[i]));
  }
  //配列をオブジェクトに変換してから配列に入れ直す

  await browser.close();
})();

router.get("/api/biccamera/meetingowl", cors(), function (req, res, next) {
  res.json(biccameraMeetingowl);
});

//-------------------------------------------------------------------------------

(async () => {
  const browser = await puppeteer.launch({ headless: false, 
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  
    args: [
      // '--disable-gpu',
      // '--disable-dev-shm-usage',
      // '--disable-setuid-sandbox',
      // '--no-first-run',
      // '--no-sandbox',
      // '--no-zygote',
      // '--single-process'
    ] });
  //headlessをfalseにしないと動作しない
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0); 
  await page.goto(
    "https://www.yamada-denkiweb.com/search/meetingowl/?path=&searchbox=1",
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
    yamadadenkiMeetingowl.push(Object.assign(postNames[i], postPrices[i]));
  }
  //配列をオブジェクトに変換してから配列に入れ直す

  await browser.close();
})();

router.get("/api/yamadadenki/Meetingowl", cors(), function (req, res, next) {
  res.json(yamadadenkiMeetingowl);
});

//-------------------------------------------------------------------------------

(async () => {
  const browser = await puppeteer.launch({ headless: false,
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  
    args: [
      // '--disable-gpu',
      // '--disable-dev-shm-usage',
      // '--disable-setuid-sandbox',
      // '--no-first-run',
      // '--no-sandbox',
      // '--no-zygote',
      // '--single-process'
    ] });
  //headlessをfalseにしないと動作しない
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0); 
  await page.goto(
    "https://online.nojima.co.jp/app/catalog/list/init?searchCategoryCode=0&searchMethod=0&searchWord=Meetingowl",
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
    nojimaMeetingowl.push(Object.assign(postNames[i], postPrices[i]));
  }
  //配列をオブジェクトに変換してから配列に入れ直す
  await browser.close();
})();

router.get("/api/nojima/Meetingowl", cors(), function (req, res, next) {
  res.json(nojimaMeetingowl);
});

//-------------------------------------------------------------------------------

(async () => {
  const browser = await puppeteer.launch({ headless: false,
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  
    args: [
      // '--disable-gpu',
      // '--disable-dev-shm-usage',
      // '--disable-setuid-sandbox',
      // '--no-first-run',
      // '--no-sandbox',
      // '--no-zygote',
      // '--single-process'
    ] });
  //headlessをfalseにしないと動作しない
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0); 
  await page.goto("https://www.edion.com/item_list.html?keyword=meetingowl", {
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
    edionMeetingowl.push(Object.assign(postNames[i], postPrices[i]));
  }
  //配列をオブジェクトに変換してから配列に入れ直す
  await browser.close();
})();

router.get("/api/edion/Meetingowl", cors(), function (req, res, next) {
  res.json(edionMeetingowl);
});

//-------------------------------------------------------------------------------

(async () => {
  const browser = await puppeteer.launch({ headless: false ,
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  
    args: [
      // '--disable-gpu',
      // '--disable-dev-shm-usage',
      // '--disable-setuid-sandbox',
      // '--no-first-run',
      // '--no-sandbox',
      // '--no-zygote',
      // '--single-process'
    ]});
  //headlessをfalseにしないと動作しない
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0); 
  await page.goto("https://kakaku.com/item/K0001262742/?lid=pc_ksearch_kakakuitem", {
    waitUntil: "networkidle2",
    // Vueのレンダリングを待つ
  });
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
    kakakucomMeetingowl.push(Object.assign(postNames[i], postPrices[i]));
  }
  console.log(postNames)
  //配列をオブジェクトに変換してから配列に入れ直す
  await browser.close();
})();

router.get(
  "/api/kakakucom/Meetingowl",
  cors(),
  function (req, res, next) {
    res.json(kakakucomMeetingowl);
  }
);

//-------------------------------------------------------------------------------

(async () => {
  const browser = await puppeteer.launch({ headless: false,
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  
    args: [
      // '--disable-gpu',
      // '--disable-dev-shm-usage',
      // '--disable-setuid-sandbox',
      // '--no-first-run',
      // '--no-sandbox',
      // '--no-zygote',
      // '--single-process'
    ] });
  //headlessをfalseにしないと動作しない
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0); 
  await page.goto("https://product.rakuten.co.jp/product/-/9d9040af1dba7d037cd8b172659c7442/item/?l2-id=pdt_item_more#price_compare", {
    waitUntil: "networkidle2",
    // Vueのレンダリングを待つ
  });
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
    rakutenMeetingowl.push(Object.assign(postNames[i], postPrices[i]));
  }
  console.log(postNames);
  //配列をオブジェクトに変換してから配列に入れ直す
  await browser.close();
})();

router.get(
  "/api/rakuten/Meetingowl",
  cors(),
  function (req, res, next) {
    res.json(rakutenMeetingowl);
  }
);

//-------------------------------------------------------------------------------

(async () => {
  const browser = await puppeteer.launch({ headless: false,
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  
    args: [
      // '--disable-gpu',
      // '--disable-dev-shm-usage',
      // '--disable-setuid-sandbox',
      // '--no-first-run',
      // '--no-sandbox',
      // '--no-zygote',
      // '--single-process'
    ] });
  //headlessをfalseにしないと動作しない
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0); 
  await page.goto("https://paypaymall.yahoo.co.jp/search?p=meeting%20owl%20pro&cid=&brandid=&kspec=&b=1", {
    waitUntil: "networkidle2",
    // Vueのレンダリングを待つ
  });
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
    paypayMeetingowl.push(Object.assign(postNames[i], postPrices[i]));
  }
  console.log(postNames);
  console.log(postPrices);
  //配列をオブジェクトに変換してから配列に入れ直す
  await browser.close();
})();

router.get(
  "/api/paypay/Meetingowl",
  cors(),
  function (req, res, next) {
    res.json(paypayMeetingowl);
  }
);

//-------------------------------------------------------------------------------

module.exports = router;
