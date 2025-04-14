const fs = require('fs')
const puppeteer = require('puppeteer')

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

;(scrapeLogic = async () => {
  const browser = await puppeteer.launch({
    //headless: false,
    headless: true,
    defaultViewport: false,
    userDataDir: './tmp',
  })
  try {
    const page = await browser.newPage()

    await page.goto('https://www.ponss.it/referrals/upsert/21')

    //let Loginne = await page.waitForSelector('#Code_Enabled', { timeout: 5000 })
    while (true) {
      try {
        await page.waitForSelector('#UserName', { timeout: 5000 })
        await page.type('#UserName', 'manepital@gmail.com', { delay: 100 })

        await sleep(3000)
        // Attendere il campo password e scrivere la password
        await page.waitForSelector('#Password', { timeout: 5000 })
        await page.type('#Password', 'dgft$f65!PST', { delay: 100 })

        await sleep(3000)

        console.log('Password inserita!')
      } catch (e) {
        // something wrong !!!!!!
        console.log(e)
        console.log('Gia loggato!')
      }

      try {
        await page.evaluate(() => {
          const buttons = document.querySelectorAll('button')
          buttons.forEach((button) => {
            if (button.innerText.includes('Accedi')) {
              button.click()
            }
          })
        })

        await sleep(2000)
        console.log('Sono entrato')
        while (true) {
          //Salva Revolut
          await page.goto('https://www.ponss.it/referrals/upsert/21')

          // Usa XPath per trovare il pulsante con testo "Salva"
          await page.waitForSelector('button')
          await sleep(2000)
          // using evaluate
          await page.evaluate(() => {
            const buttons = document.querySelectorAll('button')
            buttons.forEach((button) => {
              if (button.innerText.includes('Salva')) {
                button.click()
              }
            })
          })

          await sleep(2000)
          //Salva Satispay
          await page.goto('https://www.ponss.it/referrals/upsert/2')

          // Usa XPath per trovare il pulsante con testo "Salva"
          await page.waitForSelector('button')
          await sleep(2000)
          // using evaluate
          await page.evaluate(() => {
            const buttons = document.querySelectorAll('button')
            buttons.forEach((button) => {
              if (button.innerText.includes('Salva')) {
                button.click()
              }
            })
          })

          console.log('Eseguito! ', new Date().toLocaleString())
          await sleep(1000 * 60 * 10)
        }
      } catch (e) {
        // something wrong !!!!!!
        console.log(e)
        console.log('Try2!')
      }
    }
  } catch (e) {
    // something wrong !!!!!!
    console.log(e)
    console.log('Try3!')
  } finally {
    await browser.close()
  }
})()
  .catch((err) => console.error(err))
  .finally(() => browser?.close())

module.exports = { scrapeLogic }
