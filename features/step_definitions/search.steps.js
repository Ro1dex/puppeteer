const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const { Given, When, Then, Before, After } = require("cucumber");
const {getText, clickElement} = require("../../lib/commands.js");
Before(async function () {
  const browser = await puppeteer.launch({ headless: false});
  const page = await browser.newPage();
  this.browser = browser;
  this.page = page;
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});

Given("user is on the movie booking website", async function () {
  return await this.page.goto(`https://qamid.tmweb.ru/client/index.php`, {
    setTimeout: 30000,
  });
  
});

When('user tries to select unavailable tickets', async function () {
  await clickElement(
    this.page,
    "body > nav > a:nth-child(7)"
  );
  await clickElement(
    this.page,
    "body > main > section:nth-child(1) > div.movie-seances__hall > ul > li:nth-child(3) > a"
  );
  await this.page.waitForTimeout(1000);
  await clickElement(
    this.page,
    "div:nth-child(5) > span:nth-child(6)"
  );
});

Then('the buy button should be disabled', async function () {
  const isButtonDisabled = await this.page.$eval('button', button => button.disabled);
  expect(isButtonDisabled).true;
});
When('user buy a movie ticket on site', async function () {
  await clickElement(
    this.page,
    "body > nav > a:nth-child(7)"
  );
  await clickElement(
    this.page,
    "body > main > section:nth-child(1) > div.movie-seances__hall > ul > li:nth-child(3) > a"
  );
  await this.page.waitForTimeout(1500);
  await clickElement(
    this.page,
    "div:nth-child(4) > span:nth-child(1)"
  );
  await clickElement(this.page, "button");
  await this.page.waitForTimeout(1500);
  await clickElement(this.page, "button");
});
Then('user see his ticket', async function () {
  const actual = await getText(this.page, "h2");
  expect(actual).contain("Электронный билет");
});
When('user buy a multiple movie tickets on site', async function () {
  await clickElement(
    this.page,
    "body > nav > a:nth-child(7)"
  );
  await clickElement(
    this.page,
    "body > main > section:nth-child(1) > div.movie-seances__hall > ul > li:nth-child(3) > a"
  );
  await this.page.waitForTimeout(1000);
  await clickElement(
    this.page,
    "div:nth-child(1) > span:nth-child(3)"
  );
  await clickElement(
    this.page,
    "div:nth-child(1) > span:nth-child(2)"
  );
  await clickElement(
    this.page,
    "div:nth-child(1) > span:nth-child(5)"
  );
  await clickElement(this.page, "button");
  await this.page.waitForTimeout(1500);
  await clickElement(this.page, "button");
});


