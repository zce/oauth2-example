const db = require('./db')

const AuthorizationCode = db.addCollection('authorization_codes', {
  unique: []
})

module.exports = AuthorizationCode
