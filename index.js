const path = require('path')
const express = require('express')
const createError = require('http-errors')
const Youch = require('youch')

const users = require('./routes/users')
const account = require('./routes/account')
const oauth = require('./routes/oauth')

const app = express()

app.use(express.static(path.join(__dirname, 'public')))

app.use('/users', users)
app.use('/account', account)
app.use('/oauth', oauth)

app.use((req, res, next) => {
  next(createError(404))
})

app.use((err, req, res, next) => {
  console.error(err)
  new Youch(err, req).toHTML().then(html => res.send(html))
})

if (!module.parent) {
  app.listen(3000, () => console.log('> http://localhost:3000'))
}

module.exports = app
