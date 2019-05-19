const express = require('express')
const bodyParser = require('body-parser')

const OAuth = require('../oauth')

const oauth = new OAuth()

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/authorize', (req, res) => {
  const { client_id, redirect_uri } = req.query
  if (!req.session.currentUser) {
    return res.redirect(`/account/login?redirect=${req.url}&client_id=${client_id}&redirect_uri=${redirect_uri}`)
  }

  res.render('authorize', {
    client_id: req.query.client_id,
    redirect_uri: req.query.redirect_uri
  })
})

app.post('/authorize', oauth.authorize())
app.all('/token', oauth.token())

app.authenticate = oauth.authenticate

module.exports = app
