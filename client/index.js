const { join } = require('path')
const { stringify } = require('querystring')
const express = require('express')
const axios = require('axios')

const config = {
  oauth2Provider: {
    name: 'OAuth2 Example Server',
    client_id: 'oauth2-example-client',
    client_secret: 'f657d916-0ad9-4b65-9976-3fe796bbdea0',
    authorize_uri: 'http://localhost:3000/oauth/authorize',
    token_uri: 'http://localhost:3000/oauth/token',
    callback_uri: 'http://localhost:4000/login/callback'
  }
}

const app = express()

app.set('views', join(__dirname, 'views'))
app.set('view engine', 'pug')

app.get('/', (req, res) => {
  res.redirect('/login')
})

app.get('/login', (req, res) => {
  res.locals.oauth2 = config.oauth2Provider
  res.locals.state = Date.now()
  res.render('login')
})

app.get('/login/callback', (req, res) => {
  // TODO: callback state
  const { code } = req.query

  const postData = stringify({
    client_id: config.oauth2Provider.client_id,
    client_secret: config.oauth2Provider.client_secret,
    grant_type: 'authorization_code',
    redirect_uri: config.oauth2Provider.callback_uri,
    code: code
  })

  axios.post(config.oauth2Provider.token_uri, postData).then(response => {
    // TODO: save access_token for api request
    res.send(response.data)
  }).catch(err => {
    console.error(err)
    res.send(err.message)
  })
})

if (!module.parent) {
  app.listen(4000, () => console.log('> Client: http://localhost:4000'))
}

module.exports = app
