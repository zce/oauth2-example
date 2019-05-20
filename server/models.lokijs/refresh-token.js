const db = require('./db')

const RefreshToken = db.addCollection('refresh_tokens', {
  unique: []
})

module.exports = RefreshToken
