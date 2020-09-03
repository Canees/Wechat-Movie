// ----------------标签解析---------------
// http: //api.baiyug.vip/index.php?url=
// 这条会返回iframe 标签上自带m3u8地址 https: //youku.cdn4-okzy.com/20200701/8451_246acf95/index.m3u8
// http://api.baiyug.vip/m3u8-dp.php?url=
// 同上http://api.baiyug.vip/m3u8-dp.php?url=https://youku.cdn4-okzy.com/20200701/8451_246acf95/index.m3u8
// http://jx.618g.com/?url=
// https://jx.618g.com/?url=
// http://jx.618g.com/?url=https://youku.cdn4-okzy.com/20200701/8451_246acf95/index.m3u8
// 同上
// 直接请求到数据在iframe标签上有m3u8地址
// -------------------------------------






// ----------------API解析---------------
// 解析
// https: //www.sp-flv.com/?url=
// 原理->同test.txt文件
// https://www.sp-flv.com/api.php
// 这条查到play方法post请求api.php参数key（需要知道Key的加密方式，携带cookie），会返回m3u8地址
// |
// V
// 1.先通过https: //www.sp-flv.com/?url=需要解析的地址=》得到HTML解析到关键字KEY
// 2.通过https://www.sp-flv.com/api.php接口POST得到播放地址=》需要修改headers({Host:www.sp-flv.com,Origin:https://www.sp-flv.com,User-Agent:Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36})
// body中传入1解析到的key (key：key)
// -------------------------------------

// 1.https://v.qq.com/x/search/?q=镇魂街 {class=_playlist}=>r-props={playsrc:bilibili}=>class="item"=>a:href="https://v.qq.com/search_redirect.html?url=https%3A%2F%2Fwww.bilibili.com%2Fbangumi%2Fplay%2Fep291268"
// 2.https://v.qq.com/x/search/?q=斗罗大陆 {class=_playlist}=>r-props={playsrc:qq}=>class="item"=>a:https://v.qq.com/x/cover/m441e3rjq9kwpsc/m00253deqqo.html=>$(this)[0].COVER_INFO

