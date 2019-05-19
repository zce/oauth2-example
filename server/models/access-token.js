const db = require('./db')

const AccessToken = db.addCollection('access_tokens', {
  unique: []
})

module.exports = AccessToken
