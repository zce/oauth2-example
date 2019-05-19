const express = require('express')
const bodyParser = require('body-parser')

const OAuth = require('../oauth')

const oauth = new OAuth()

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/authorize', (req, res) => {
  res.send({ query: req.query })
})

app.post('/authorize', oauth.authorize())
app.all('/token', oauth.token())

app.authenticate = oauth.authenticate

module.exports = app
