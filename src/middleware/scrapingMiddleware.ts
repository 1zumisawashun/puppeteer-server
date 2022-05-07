import puppeteer from 'puppeteer-core';
const executablePath =
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

export const productScraping = async (shop: any) => {
  const browser = await puppeteer.launch({
    executablePath: executablePath,
    // slowMo: 50,
    headless: true,
  });
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
  await page.goto(shop.url, {
    waitUntil: 'networkidle2',
  });

  // NOTE:IDのみ持つARRAYを生成する
  let generateArray = await page.evaluate((selector) => {
    const list = Array.from(document.querySelectorAll(selector));
    return list.map((_, index) => {
      return { id: index };
    });
  }, shop.namePath);
  // FIXME:1回のスクレイピングで処理できないか調査をする
  // NOTE:複数取得はあくまで要素のみ（aタグ・href属性・textContentなど）

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

  // NOTE:商品名のスクレイピング
  const linkDatas = await page.evaluate((selector) => {
    const list = Array.from(document.querySelectorAll(selector));
    return list.map((data, index) => {
      return {
        id: index,
        link: data.href,
      };
    });
  }, shop.linkPath);

  // NOTE:プロパティアクセスできるように加工する
  const formatDatas = (array: any[]) => {
    return array.reduce((accumulator, currentValue, index) => {
      accumulator[index] = currentValue;
      return accumulator;
    }, {});
  };
  const formatPriceDatas = formatDatas(priceDatas);
  const formatNameDatas = formatDatas(nameDatas);
  const formatLinkDatas = formatDatas(linkDatas);

  // NOTE:一致するオブジェクトをマージさせる
  const mergeDatas = (array: any[]) => {
    generateArray = generateArray.map((el) => {
      return { ...array[el.id], ...el } ?? el;
    });
  };
  mergeDatas(formatPriceDatas);
  mergeDatas(formatNameDatas);
  mergeDatas(formatLinkDatas);

  await browser.close();
  return generateArray;
};

export const testScraping = async () => {
  console.log('test');
};
