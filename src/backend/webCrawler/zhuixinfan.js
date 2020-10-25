const axios = require("axios")
const cheerio = require('cheerio')

async function fetchList (){
  const result = []
  let data
  const url = 'http://www.zhuixinfan.com/main.php?mod=viewall&action=tvplay&area=1&alpha=&orderby=fp_date&sort=DESC&inajax=1'
  await axios.get(url).then((response) => {
    data = response.data
    data = data.replace('<?xml version="1.0" encoding="utf-8"?>', '').replace('<root><![CDATA[','').replace(']]></root>','')
   })
  const $ = cheerio.load(data,{
    normalizeWhitespace: true,
    xmlMode: true
  })
  const tvListElem = $('.td2').get()
  for (const elem of tvListElem) {
    let name = $('a',elem).eq(1).text()
    let pid = ($('a',elem).eq(1).attr('href')).replace('viewtvplay-','').replace('.html','')
    let genre = $(elem).next().text()
    let status = $(elem).next().next().text() //连载状态：连载，完结
    result.push({pid,name,genre,status})
  }


  return result
}

// 获取日剧详细信息
async function getInfo(pid){
  let data
  const url = 'http://www.zhuixinfan.com/viewtvplay-' + pid + '.html'
  await axios.get(url).then((response) => {
    data = response.data
  })
  const $ = cheerio.load(data,{
    normalizeWhitespace: true,
    xmlMode: true
  })
  const serieslist = []
  const shortDesc = $('#shortDesc').text()
  const poster = $('.detail-img-pic').find('a').attr('href')
  const seriesElem = $('.td2').get()
  for (const elem of seriesElem) {
    serieslist.push($('a',elem).attr('href').replace('main.php?mod=viewresource&sid=', ''))
  }
  return {shortDesc,poster,serieslist}
}

// 获取磁力下载地址
async function getDownUrl(sid){
  let data
  const url = 'http://www.zhuixinfan.com/main.php?mod=viewresource&sid=' + sid
  await axios.get(url).then((response) => {
    data = response.data
  })
  const $ = cheerio.load(data,{
    normalizeWhitespace: true,
    xmlMode: true
  })
  const torrent_url = $('#torrent_url').text()
  return torrent_url
}


exports.fetchList = fetchList