const { clickElement, getText } = require("./lib/commands.js");
jest.setTimeout(10000);
let page;

describe("tests Tiket Store", () => {
  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto("https://qamid.tmweb.ru/client/index.php");
  });
  afterEach(() => {
    page.close();
  });
  test.skip("test Buy 1 ticket", async () => {
    await clickElement(
      page,
      "body > nav > a:nth-child(7)"
    );
    await clickElement(
      page,
      "body > main > section:nth-child(1) > div.movie-seances__hall > ul > li:nth-child(3) > a"
    );
    await page.waitForTimeout(1000);
    await clickElement(
      page,
      "div:nth-child(6) > span:nth-child(1)"
    );
    await clickElement(page, "button");
    await page.waitForTimeout(1000);
    await clickElement(page, "button");
    const actual = await getText(page, "h2");
    expect(actual).toContain("Электронный билет");
  });
  test("test Buy many tickets", async () => {
    await clickElement(
      page,
      "body > nav > a:nth-child(7)"
    );
    await clickElement(
      page,
      "body > main > section:nth-child(1) > div.movie-seances__hall > ul > li:nth-child(3) > a"
    );
    await page.waitForTimeout(1000);
    await clickElement(
      page,
      "div:nth-child(6) > span:nth-child(4)"
    );
    await clickElement(
      page,
      "div:nth-child(6) > span:nth-child(5)"
    );
    await clickElement(
      page,
      "div:nth-child(6) > span:nth-child(7)"
    );
    await clickElement(page, "button");
    await page.waitForTimeout(1000);
    await clickElement(page, "button");
    const actual = await getText(page, "h2");
    expect(actual).toContain("Электронный билет");
  });
  test.only("test Buy unavailible tickets", async () => {
    await clickElement(
      page,
      "body > nav > a:nth-child(7)"
    );
    await clickElement(
      page,
      "body > main > section:nth-child(1) > div.movie-seances__hall > ul > li:nth-child(3) > a"
    );
    await page.waitForTimeout(1000);
    await clickElement(
      page,
      "div:nth-child(5) > span:nth-child(6)"
    );
    const isButtonDisabled = await page.$eval('button', button => button.disabled);
    expect(isButtonDisabled).toBe(true);
  });
});
