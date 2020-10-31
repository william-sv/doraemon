const IndexController = require('./controller/index')
const VideoController = require('./controller/video')
const CrawlerController = require('./controller/crawler')
const FoldersController = require('./controller/folders')

module.exports = function(app){
  app.get('/', IndexController.index)
  app.get('/favicon.ico', (req, res) => res.status(204))
  app.get('/video/url', VideoController.getURL)
  app.get('/web', CrawlerController.index)
  app.get('/folder', FoldersController.index)
}