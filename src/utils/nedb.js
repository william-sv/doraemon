// nedb封装方法
const Datastore = require('nedb')

function DB(database){
  let options = {
    filename: database,
    autoload: true,
  }
  this.db = new Datastore(options)
}
DB.prototype.limit = function (offset, limit) {
  this.offset = offset || 0
  this.limit = limit || 10
  return this
}
DB.prototype.sort = function(orderBy){
  this.orderBy = orderBy
  return this
}
/**
 * query: Object类型  查询条件 支持使用比较运算符($lt, $lte, $gt, $gte, $in, $nin, $ne), 逻辑运算符
 * offset: 偏移量 忽略多少条  用于分页
 * limit: 返回条数  用于分页
 * 返回: docs 数组  返回查询到的数据
 * * */
DB.prototype.find = function (query, select) {
  return new Promise((resolve, reject) => {
    let stmt = this.db.find(query || {})
    if(this.orderBy !== undefined){
      stmt.sort(this.orderBy)
    }
    if(this.offset !== undefined){
      stmt.skip(this.offset).limit(this.limit)
    }
    if(select !== undefined){
      stmt.projection(select || {})
    }
    stmt.exec((err,docs) => {
      if(err){
        return reject(err)
      }
      resolve(docs)
    })
  })
}
/**
 * query: object  查询条件
 * 查找一条
 * 返回: 查到数据
 * * */
DB.prototype.findOne = function (query, select) {
  return new Promise((resolve, reject) => {
    let stmt = this.db.findOne(query || {})
    if(this.sort !== undefined){
      stmt.sort(this.sort)
    }
    if(select !== undefined){
      stmt.projection(select || {})
    }
    stmt.exec((err, doc) => {
      if(err){
        return reject(err)
      }
      resolve(doc)
    })
  })
}
/**
 * 插入数据
 * value: 插入的数据
 * 使用array，实现批量插入。一旦其中一个操作失败，所有改变将会回滚。
 * * */
DB.prototype.insert = function (values) {
  return new Promise((resolve, reject) => {
    this.db.insert(values, (err,newDoc) => {
      if(err){
        return reject(err)
      }
      resolve(newDoc)
    })
  })
}
/**
 * 更新数据
 * query: object  查询的数据
 * values: 更新的数据
 * options : object  muti(默认false)，是否允许修改多条文档；upsert(默认为false)
 * * */
DB.prototype.update = function(query, values, options) {
  return new Promise((resolve, reject) => {
    this.db.update(query || {}, values || {}, options || {}, (err, numAffected) => {
      if (err) {
        return reject(err)
      }
      resolve(numAffected)
    })
  })
}
/**
 * 根据options配置删除所有query匹配到的文档集。
 * query: 与find和findOne中query参数的用法一致
 * options: 只有一个可用。muti(默认false)，允许删除多个文档
 * * */
DB.prototype.remove = function(query, options) {
  return new Promise((resolve, reject) => {
    this.db.remove(query || {}, options || {}, (err, numAffected) => {
      if (err) {
        return reject(err)
      }
      resolve(numAffected)
    })
  })
}



module.exports = (database) => {
  return new DB(database)
}

