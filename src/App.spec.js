
const path = require('path')
describe('Chart', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:3002');
  });

  it('should display "Upload button" on page', async () => {
    const uploadBtn = await page.$eval('#uploadBtn', el => (el ? true : false));
    await expect(uploadBtn).toBe(true);
  });
  it('should display "export Button" on page', async () => {
    const [fileChooser] = await Promise.all([
      page.waitForFileChooser(),
      page.click('#uploadBtn')
    ])
    await fileChooser.accept(['./src/csvFile/country.csv'])
    await page.screenshot({paht: './src/s.png'});
    const exportBtn = await page.$eval('#exportBtn', el => (el ? true : false));
    await expect(exportBtn).toBe(true);
  });

  it('should display "chart" on page', async () => {
    const chart = await page.$eval('.canvasjs-chart-container', el => (el ? true : false));
    await expect(chart).toBe(true);
  });
  it('should download file', async () => {
    /* const client = await page.target().createCDPSession();
    await client.send('Page.setDownloadBehavior', {
      behavior: 'allow', downloadPath: path.resolve(__dirname,'./downloaded')});*/
    await page.click('#exportBtn');
    const isDownload = await page.$eval('#downloadElement', el => (el ? true : false))
    console.log(isDownload);
    await expect(isDownload).toBe(true);
  }) 
});