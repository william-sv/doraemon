(function(){
  var express = require('express');
var routes = require('./route');

var app = express();

// 跨域
app.all('*', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
})

routes(app)

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'))
app.listen(1221);
})()
