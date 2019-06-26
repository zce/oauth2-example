const { Router } = require('express')

const oauth = require('../oauth')

const router = Router()

router.all('/authorize', oauth.authorize())

router.all('/token', oauth.token())

router.authenticate = oauth.authenticate

module.exports = router
