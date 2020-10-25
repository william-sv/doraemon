import Datastore from 'nedb'
import path from 'path'
import { remote } from 'electron'

const db = {}

// 分类数据库
db.categories = new Datastore({
  autoload: true,
  filename: path.join(remote.app.getPath('userData'), '/categories.db')
})

// 菜单数据库
db.menus = new Datastore({
  autoload: true,
  filename: path.join(remote.app.getPath('userData'), '/menus.db')
})

//本地视频数据库
db.filmsLibrary = new Datastore({
  autoload: true,
  filename: path.join(remote.app.getPath('userData'), '/films.db')
})

// 播放列表
db.playlist = new Datastore({
  autoload: true,
  filename: path.join(remote.app.getPath('userData'), '/playlist.db')
})

// 日剧缓存库
db.JPTeleplayLibrary = new Datastore({
  autoload: true,
  filename: path.join(remote.app.getPath('userData'), '/JPTeleplayLibrary.db')
})

// 美剧缓存库
db.USTeleplayLibrary = new Datastore({
  autoload: true,
  filename: path.join(remote.app.getPath('userData'), '/USTeleplayLibrary.db')
})



export default db