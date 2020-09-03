// 云函数入口文件
const cloud = require('wx-server-sdk')
const request = require('request-promise');
const cheerio = require('cheerio')
cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const { url } = event
  let newurl = null
  await request({
    method: 'GET',
    'url': url
  }).then(res => {
    const $ = cheerio.load(res)
    // 查找iframe
    const iframes = $('#cms_play').children('script')
    let scriptdata = ''
    iframes.each(function () {
      scriptdata += $(this).html()
    })
    // 字符串截取拿到m3u8地址
    const htps = scriptdata.indexOf('https')
    const cns = scriptdata.substring(htps)
    const tps = cns.indexOf(',')
    const dt = cns.substring(0, tps - 1)
    // 需要去掉转义符
    const uls = dt.replace(/\\/g,'')
    if (htps != -1) {
      newurl = {
        static: 200,
        data: uls
      }
    } else {
      newurl = {
        static: 204,
        data: '数据错误'
      }
    }
  })
  return newurl
}