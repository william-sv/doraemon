const { app } = require("electron")

var IndexController = require('./controller/index')
var VideoController = require('./controller/video')
var CrawlerController = require('./controller/crawler')

module.exports = function(app){
  app.get('/', IndexController.index)
  app.get('/video/url', VideoController.getURL)
  app.get('/web', CrawlerController.index)
}