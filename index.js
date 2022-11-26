
const puppeteer = require('puppeteer')



(async() => {

    const browser = await puppeteer.launch({
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox'
        ],
        headless: true,
        executablePath: '/usr/bin/google-chrome'
    });

    const page = await browser.newPage();

    await page.goto('https://google.com', {waitUntil: 'networkidle2'});

    await page.screenshot({path: '/app/screenshots/screen.png', fullPage: true})

    // Get the "viewport" of the page, as reported by the page.
    const dimensions = await page.evaluate(() => {
        return {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight,
            deviceScaleFactor: window.devicePixelRatio
        };
    });

    console.log('Dimensions:', dimensions);
    browser.close();

})();
