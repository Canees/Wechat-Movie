// 云函数入口文件
const cloud = require('wx-server-sdk')
const request = require('request-promise');
const cheerio = require('cheerio')
const domain = 'https://www.90sdyw.com' //被爬网站
cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const { href } = event
  let db = ''
  // 请求视频集
  await request({
    'method': 'GET',
    'url': domain + href
  }).then(res => {
    if (res) {
      // 解析出搜索的结果
      const $ = cheerio.load(res) //类似jq
      // 需要判断哪个剧集最多
      const playlist = $('.playlist > ul')
      const morelist = []
      playlist.each(function(){
        let db = ''
        if($(this).children('li')){
          db = ($(this).children('li'))
        }
        morelist.push(db)
      })
      // 排序处理
      morelist.sort((a,b)=>{
        return b.length - a.length
      })
      // 找到标签下的视频集合最多的
      const atag = morelist[0]
      let data = []
      if (atag.length > 0) {
        atag.each(function () {
          const obj = {
            name: $(this).text(),
            url: domain + $(this).children('a').attr('href')
          }
          data.push(obj)
        })
        db = {
          static: 200,
          data: data
        }
      } else {
        db = {
          static: 204,
          data: '解析错误'
        }
      }
    } else {
      db = {
        static: 204,
        data: '解析错误'
      }
    }
  })
  return db
}