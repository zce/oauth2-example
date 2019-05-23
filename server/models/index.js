const low = require('lowdb')
const Memory = require('lowdb/adapters/Memory')
const FileSync = require('lowdb/adapters/FileSync')
const objectId = require('./object-id')

const defaults = require('./defaults')

const adapters = {
  memory: new Memory(),
  filesync: new FileSync('db.json')
}
const db = low(adapters.filesync)

// extend
db._.mixin(objectId)

// set defaults
db.defaults(defaults).write()

// export collections
exports.clients = db.get('clients')
exports.authorizationCodes = db.get('authorization_codes')
exports.accessTokens = db.get('access_tokens')
exports.refreshTokens = db.get('refresh_tokens')
exports.scopes = db.get('scopes')
exports.users = db.get('users')
exports.posts = db.get('posts')
