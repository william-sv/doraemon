import Datastore from 'nedb'
import path from 'path'
import { remote } from 'electron'
const databaseConnect = require('./utils/nedb')

const db = {}

// 分类数据库
db.genres = databaseConnect(path.join(remote.app.getPath('userData'), '/genres.db'))

// 菜单数据库
db.menus = databaseConnect(path.join(remote.app.getPath('userData'), '/menus.db'))

//本地视频数据库
// db.filmsLibrary = require('./utils/nedb')(path.join(remote.app.getPath('userData'), '/films.db'))
db.filmsLibrary = databaseConnect(path.join(remote.app.getPath('userData'), '/films.db'))

//本地视频库数据库
db.libraries = databaseConnect(path.join(remote.app.getPath('userData'), '/libraries.db'))

// 播放列表
db.playlistLibrary = databaseConnect(path.join(remote.app.getPath('userData'), '/playlist.db'))

// 日剧缓存库
db.JPTeleplayLibrary = databaseConnect(path.join(remote.app.getPath('userData'), '/JPTeleplayLibrary.db'))

// 美剧缓存库
db.USTeleplayLibrary = databaseConnect(path.join(remote.app.getPath('userData'), '/USTeleplayLibrary.db'))

// 杂质词
db.impuritiesLibrary = databaseConnect(path.join(remote.app.getPath('userData'), '/impurities.db'))


export default db