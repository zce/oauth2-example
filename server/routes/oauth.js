const { escape } = require('querystring')
const { Router } = require('express')

const OAuth = require('../oauth')

const oauth = new OAuth()

const router = Router()

router.get('/authorize', (req, res) => {
  if (!req.session.currentUser) {
    return res.redirect(`/account/login?redirect=${escape(req.originalUrl)}`)
  }

  oauth.model.getClient(req.query.client_id, null, (err, client) => {
    if (err) throw err
    res.render('authorize', {
      client_name: client.name,
      client_id: client.key,
      scope: req.query.scope,
      redirect_uri: req.query.redirect_uri,
      response_type: req.query.response_type,
    })
  })
})

router.post('/authorize', oauth.authorize())

router.all('/token', oauth.token())

router.authenticate = oauth.authenticate

module.exports = router
