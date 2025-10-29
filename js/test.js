const { By, Key, Builder } = require("selenium-webdriver");
require("chromedriver");

async function test_case() {
  let driver = await new Builder().forBrowser("chrome").build();

  await driver.get("http://localhost:5501/");

  await driver.findElement(By.name("search")).sendKeys("Web", Key.RETURN);

  setInterval(function () {
    driver.quit();
  }, 10000);
}

test_case();
