const OAuthServer = require('oauth2-server')
// const AccessDeniedError = require('oauth2-server/lib/errors/access-denied-error')
// const InvalidArgumentError = require('oauth2-server/lib/errors/invalid-argument-error')
const UnauthorizedRequestError = require('oauth2-server/lib/errors/unauthorized-request-error')
const Model = require('./model')

const { Request, Response } = OAuthServer

module.exports = class OAuth {
  constructor (options = {}) {
    if (!options.model) {
      options.model = new Model()
    }

    this.model = options.model

    this.useErrorHandler = !!options.useErrorHandler
    delete options.useErrorHandler

    this.continueMiddleware = !!options.continueMiddleware
    delete options.continueMiddleware

    this.server = new OAuthServer(options)
  }

  handleResponse (req, res, response) {
    if (response.status === 302) {
      const location = response.headers.location
      delete response.headers.location
      res.set(response.headers)
      res.redirect(location)
    } else {
      res.set(response.headers)
      res.status(response.status).send(response.body)
    }
  }

  handleError (err, req, res, response, next) {
    if (this.useErrorHandler === true) {
      return next(err)
    }

    if (response) {
      res.set(response.headers)
    }

    res.status(err.code)

    if (err instanceof UnauthorizedRequestError) {
      return res.send()
    }

    console.error(err)

    res.send({ error: err.name, error_description: err.message })
  }

  authenticate (options) {
    return (req, res, next) => {
      const request = new Request(req)
      const response = new Response(res)

      return this.server.authenticate(request, response, options)
        .then(token => {
          res.locals.oauth = { token: token }
          next()
        })
        .catch(err => {
          return this.handleError(err, req, res, null, next)
        })
    }
  }

  authorize (options) {
    return (req, res, next) => {
      const request = new Request(req)
      const response = new Response(res)

      return this.server.authorize(request, response, options)
        .then(code => {
          console.log(code)
          res.locals.oauth = { code: code }
          this.continueMiddleware && next()
        })
        .then(() => {
          return this.handleResponse(req, res, response)
        })
        .catch(e => {
          console.log(e)
          return this.handleError(e, req, res, response, next)
        })
    }
  }

  token (options) {
    return (req, res, next) => {
      const request = new Request(req)
      const response = new Response(res)

      return this.server.token(request, response, options)
        .then(token => {
          res.locals.oauth = { token: token }
          this.continueMiddleware && next()
        })
        .then(() => {
          return this.handleResponse(req, res, response)
        })
        .catch(e => {
          return this.handleError(e, req, res, response, next)
        })
    }
  }
}
