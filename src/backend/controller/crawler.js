var zxf = require('../webCrawler/zhuixinfan')
module.exports = {
  async index (req, res, next){
    let source = req.query.source
    let result
    switch (source) {
      case 'zhuixinfan':
        result = await zxf.fetchList()
        break
      case 'btdx8':
        break
      default:
        break
    }
    res.json({status: 200, data: result})
    
  }
}