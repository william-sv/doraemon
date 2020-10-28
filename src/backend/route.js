var IndexController = require('./controller/index')
var VideoController = require('./controller/video')
var CrawlerController = require('./controller/crawler')
var FoldersController = require('./controller/folders')

module.exports = function(app){
  app.get('/', IndexController.index)
  app.get('/favicon.ico', (req, res) => res.status(204))
  app.get('/video/url', VideoController.getURL)
  app.get('/web', CrawlerController.index)
  app.get('/folder', FoldersController.index)
}