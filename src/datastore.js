import Datastore from 'nedb'
import path from 'path'
import { remote } from 'electron'

var db = {}

db.categories = new Datastore({
  autoload: true,
  filename: path.join(remote.app.getPath('userData'), '/categories.db')
})

db.filmsLibrary = new Datastore({
  autoload: true,
  filename: path.join(remote.app.getPath('userData'), '/films.db')
})

db.directoryLibrary = new Datastore({
  autoload: true,
  filename: path.join(remote.app.getPath('userData'), '/directorys.db')
})

export default db