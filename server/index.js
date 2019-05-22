const path = require('path')
const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const createError = require('http-errors')
const Youch = require('youch')

const users = require('./routes/users')
const account = require('./routes/account')
const oauth = require('./routes/oauth')

const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(express.static(path.join(__dirname, 'public')))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(session({
  secret: 'oauth2-example',
  resave: false,
  saveUninitialized: true
}))

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
