const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const objectId = require('./object-id')

const defaults = require('./defaults')

const adapter = new FileSync('db.json')
const db = low(adapter)

// extend
db._.mixin(objectId)

// set defaults
db.defaults(defaults).write()

// export collections
exports.clients = db.get('clients')
exports.authorization_codes = db.get('authorization_codes')
exports.access_tokens = db.get('access_tokens')
exports.refresh_tokens = db.get('refresh_tokens')
exports.scopes = db.get('scopes')
exports.users = db.get('users')
exports.posts = db.get('posts')
