module.exports = {
  index (req, res, next){
    const data = {
      "version": "1.0",
      "author": "william.sv@icloud.com"
    }
    res.json({status: 200, data: data})
  }
}