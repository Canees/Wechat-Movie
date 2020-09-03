// 云函数入口文件
const cloud = require('wx-server-sdk')
const request = require('request-promise');
const cheerio = require('cheerio')
cloud.init()
// 视频搜索
const movieSearch = 'https://www.90sdyw.com/search/'
// 云函数入口函数
exports.main = async (event, context) => {
  const { name } = event
  // 请求搜索视频
  let db = []
  await request({
    'method': 'POST',
    'url': movieSearch,
    formData: {
      'wd': name
    }
  }).then(res => {
    // console.log(res)
    if (res) {
      // 解析出搜索的结果
      const $ = cheerio.load(res) //类似jq
      // 找到a标签下的视频集合
      const atag = $('#content a.video-pic.loading')
      if (atag.length > 0) {
        // jq写法
        let videolist = [] //找到的视频数据
        atag.each(function () {
          const obj = {
            name: $(this).attr('title'),
            img: $(this).attr('data-original'),
            href: $(this).attr('href')
          }
          videolist.push(obj)
        })
        db = {
          static: 200,
          data: videolist
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