const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.goto('http://localhost:3002', {waitUntil: 'networkidle2'});
  
 // await page.pdf({path: 'hn.pdf', format: 'A4'});

  //await browser.close();
})();