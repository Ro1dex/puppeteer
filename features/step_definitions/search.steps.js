const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const { Given, When, Then, Before, After } = require("cucumber");
const {getText } = require("../../lib/commands.js");

Before(async function () {
  const browser = await puppeteer.launch({ headless: false, slowMo: 50 });
  const page = await browser.newPage();
  this.browser = browser;
  this.page = page;
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});

Given("user is on the movie booking website", async function (string) {
  return await this.page.goto(`https://qamid.tmweb.ru/client/index.php`, {
    setTimeout: 20000,
  });
});

When('user tries to select unavailable tickets', async function () {
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
});

Then('the buy button should be disabled', async function () {
  const isButtonDisabled = await page.$eval('button', button => button.disabled);
  expect(isButtonDisabled).toBe(true);
});
When('user buy a movie ticket on sites', async function () {
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
});
Then('user see his ticket', async function () {
  const actual = await getText(page, "h2");
  expect(actual).toContain("Электронный билет");
});


