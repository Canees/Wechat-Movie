// 云函数入口文件
const cloud = require('wx-server-sdk')
const puppeteer = require('puppeteer')
cloud.init()
// 异步封装=》无法上传函数
async function GetVideoUrl(newurl = 'https://v.qq.com/x/cover/mzc00200ytgrst3.html') {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36");
  await page.evaluateOnNewDocument(() => {
    Object.defineProperty(navigator, 'webdriver', {
      get: () => false,
    });
  });
  await page.goto(`https://www.sp-flv.com/?url=${newurl}`);
  let newpromise = new Promise((resolve) => {
    page.on('response', async response => {
      let res = {
        static: 404,
        data: ''
      }
      if (response.url().includes('/api.php')) {
        let db = await response.text()
        let data = JSON.parse(db)
        // 利用页面方法解析数据
        if (data.code == 200) {
          let urls = await page.evaluate((data) => {
            let CryptoJS = window.CryptoJS;
            let key = data.key;
            let iv = data.iv;
            let str = data.url;
            let keys = CryptoJS.enc.Utf8.parse(key);// 秘钥
            let ivv = CryptoJS.enc.Utf8.parse(iv);//向量iv
            let decrypted = CryptoJS.AES.decrypt(str, keys, { iv: ivv, padding: CryptoJS.pad.ZeroPadding });//解码
            let rest = decrypted.toString(CryptoJS.enc.Utf8);
            return rest
          }, data)
          res.static = 200
          res.data = urls
          await browser.close();//关闭浏览器
        } else {
          await browser.close();//关闭浏览器
        }
      } else {
        await browser.close();//关闭浏览器
      }
      resolve(res)
    })
  })
  return await newpromise
}
// 云函数入口函数
exports.main = async (event, context) => {
  const { url } = event
  let db = GetVideoUrl(url).then(res => {
    return res
  })
  return db
}