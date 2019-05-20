const db = require('./db')

const Scope = db.addCollection('scopes', {
  unique: []
})

module.exports = Scope
