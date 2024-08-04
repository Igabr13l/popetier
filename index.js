import puppeteer from "puppeteer";

const scrape = async () => {

  const user = {
    username: "ivangabriel2048",
    password: "204824a132508796",
  }

  const COUNTRY = {
    ARGENTINE: 1,
    GERMANY: 13,
  }

  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("https://onlineservices.immigration.govt.nz/?WHS");

  await page.setViewport({ width: 1080, height: 1024 });

  await Promise.all([
    page.waitForSelector('input[name="username"]'),
    page.waitForSelector('input[name="password"]')
  ])

  //login
  await page.type('input[name="username"]', user.username)
  await page.type('input[name="password"]', user.password)

  await page.locator('input[type="submit"]').click();

  // finish login

  try {
    await page.waitForNavigation({ waitUntil: 'networkidle0' })
    const exist = await page.evaluate(() => !!document.getElementById('ContentPlaceHolder1_existingApplicationPanel'))
    if (exist) {
      await page.locator(`#ContentPlaceHolder1_applicationList_applicationsDataGrid_deleteHyperlink_${0}`).click()
      await page.locator('#ContentPlaceHolder1_okDeleteButton').click()
      await page.locator('#ContentPlaceHolder1_homePageUrl').click()
      console.log('borrado anterior formulario')
    }
    console.log('existe formulario :', exist)
  } catch (error) {
    console.error(error)
  }


  const countryButton = `#ContentPlaceHolder1_countryRepeater_countryDivFooter_${COUNTRY.GERMANY}`

  await page.locator(countryButton).click()

  await page.locator('input[type=submit]').click()

  await new Promise(r => setTimeout(r, 5000))
  await browser.close();
}

scrape();