// 云函数入口文件
const cloud = require('wx-server-sdk')
const puppeteer = require('puppeteer')
cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  puppeteer.launch({
    headless: false //要看演示可以使用false
  }).then(async browser => {
    const page = await browser.newPage();
    await page.goto('https://www.baidu.com/');
    await page.type('#kw', '贝尔塔猫');
    await page.click('#su');
    console.log(666, page)
    // await browser.close();
  })
  return puppeteer
}