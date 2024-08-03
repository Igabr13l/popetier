import puppeteer from "puppeteer";

const scrape = async () => {

  /*   const browser = await puppeteer.launch({ headless: false, slowMo: 400 });
    const page = await browser.newPage();
    await page.goto("https://www.google.com");
    await page.screenshot({ path: "example.png" });
 
    await browser.close(); */

  /* const browser = await puppeteer.launch({ headless: false, slowMo: 100 });
  const page = await browser.newPage();

  // Navigate the page to a URL.
  await page.goto('https://developer.chrome.com/');

  // Set screen size.
  await page.setViewport({ width: 1080, height: 1024 });

  // Type into search box.
  await page.locator('.devsite-search-field').fill('automate beyond recorder');

  // Wait and click on first result.
  await page.locator('.devsite-result-item-link').click();

  // Locate the full title with a unique string.
  const textSelector = await page
    .locator('text/Customize and automate')
    .waitHandle();
  const fullTitle = await textSelector?.evaluate(el => el.textContent);

  // Print the full title.
  console.log('The title of this blog post is "%s".', fullTitle);

  await browser.close(); */

  const user = {
    username: "ivangabriel2048",
    password: "204824a132508796",
  }

  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("https://onlineservices.immigration.govt.nz/?WHS");
  page.workers([async (worker) => { alert('worker') }, async (worker) => { alert('worker2') }])
  await page.setViewport({ width: 1080, height: 1024 });

  await Promise.all([
    page.waitForSelector('input[name="username"]'),
    page.waitForSelector('input[name="password"]')
  ])

  await page.type('input[name="username"]', user.username)
  await page.type('input[name="password"]', user.password)

  await page.locator('input[type="submit"]').click();

  const countryButton = `#ContentPlaceHolder1_countryRepeater_countryDivFooter_${13}`

  await page.locator(countryButton).click()

  await page.locator('input[type=submit]').click()

  await new Promise(r => setTimeout(r, 5000))
  await browser.close();
}



scrape();