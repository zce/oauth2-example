const { escape } = require('querystring')
const { Router } = require('express')

const OAuth = require('../oauth')

const oauth = new OAuth()

const router = Router()

router.get('/authorize', (req, res) => {
  if (!req.session.currentUser) {
    return res.redirect(`/account/login?redirect=${escape(req.originalUrl)}`)
  }

  const { client_id, redirect_uri } = req.query
  res.render('authorize', { client_id, redirect_uri })
})

router.post('/authorize', oauth.authorize())
router.all('/token', oauth.token())

router.authenticate = oauth.authenticate

module.exports = router
