(function(){
  var express = require('express')
  var routes = require('./route')
  var app = express()

  // 跨域
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Authorization,X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method' )
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PATCH, PUT, DELETE')
    res.header('Allow', 'GET, POST, PATCH, OPTIONS, PUT, DELETE')
    next()
  })

  routes(app)
  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))
  app.use(express.static('public'))

  app.listen(1221)

})()
