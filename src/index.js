const puppeteer = require('puppeteer')
  const dir = __dirname + "/brendo"
   const path = require('path')

      const downloadPath = path.resolve('./download')

class Envato {
 



  init = async () => {

    try {
    console.log("Opening the browser......");
    this.browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      ignoreHTTPSErrors: true,
      userDataDir: dir,
    });
  } catch (err) {
    console.log("Could not create a browser instance => : ", err);
  }     
     





    const page = await this.browser.newPage();
    await page.goto(
      "https://elements.envato.com/pt-br/notepaper-hanging-on-clothesline-PHGVKY9"
    );


    const client = await page.target().createCDPSession();
    await client.send("Page.setDownloadBehavior", {
      behavior: "allow",
      downloadPath,
    });



await page.evaluate((btnSelector) => {
 
  document.querySelector(btnSelector).click();
}, 'button[data-test-selector="download-button"]');





   setTimeout( async () => {
   await  page.evaluate((btnSelector) => {
      document.querySelector(btnSelector).click();
      
    }, 'button[data-test-selector="download-without-license"]');



   
   }, 5000);


    




    






    

    
    // login
    // await page.type('input[name="username"]', "amaroabril91@gmail.com")
    //await page.type('input[name="password"]', "goleiro2014")
    //await page.click('button[data-test-selector="sign-in-submit"]')
    //await page.waitForNavigation({waitUntil: 'networkidle0'})
    //console.log('signed in')
  }

  downloadPresentationTemplates = async () => {

  }
}

const main = async () => {
  const envato = new Envato(false)
  await envato.init()




}

main().then()
