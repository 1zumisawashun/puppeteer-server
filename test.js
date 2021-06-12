const puppeteer = require("puppeteer-core");

(async () => {
  //option
  var option = {
    headless: false,
    executablePath:
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    slowMo: 500,
    args: [
      // ゲストセッションで操作する。
      "--guest",

      // ウインドウサイズをデフォルトより大きめに。
      "--window-size=1280,800",

      //最大化で表示
      "--start-fullscreen",

      //情報バーの非表示
      "--disable-infobars",

      //シークレットモード
      "--incognito",
    ],
  };

  const browser = await puppeteer.launch(option);
  const page = await browser.newPage();

  await page.setViewport({
    width: 1280,
    height: 700,
    deviceScaleFactor: 1,
  });
  await page.goto("https://www.google.com/");
  await page.type("input[name=q]", "三峯神社", { delay: 100 });
  await page.click('input[type="submit"]');
  await page.waitForSelector("h3 a");
  await page.screenshot({ path: "screenshot/result.png", fullPage: true });

  await browser.close();
})();
