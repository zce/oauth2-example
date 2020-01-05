// https://oauth2-server.readthedocs.io/en/latest/model/spec.html

const { clients, authorizationCodes, accessTokens, refreshTokens, users } = require('../models')

module.exports = class Model {
  // constructor () { }

  // generateAccessToken (client, user, scope) { }

  // generateRefreshToken (client, user, scope) { }

  // generateAuthorizationCode (client, user, scope) { }

  getAccessToken (accessToken) {
    const token = accessTokens.find({ token: accessToken }).value()
    if (!token) return Promise.resolve(null)
    const client = clients.getById(token.client_id).value()
    const user = users.getById(token.user_id).value()
    return Promise.resolve({
      accessToken: token.token,
      accessTokenExpiresAt: new Date(token.expires),
      scope: token.scope,
      client: client,
      user: user
    })
  }

  getRefreshToken (refreshToken) {
    const token = refreshTokens.find({ token: refreshToken }).value()
    if (!token) return Promise.resolve(null)
    const client = clients.getById(token.client_id).value()
    const user = users.getById(token.user_id).value()
    return Promise.resolve({
      refreshToken: token.token,
      refreshTokenExpiresAt: new Date(token.expires),
      scope: token.scope,
      client: client,
      user: user
    })
  }

  getAuthorizationCode (authorizationCode) {
    const code = authorizationCodes.find({ code: authorizationCode }).value()
    if (!code) return Promise.resolve(null)
    const client = clients.getById(code.client_id).value()
    const user = users.getById(code.user_id).value()
    return Promise.resolve({
      code: code.code,
      expiresAt: new Date(code.expires),
      redirectUri: code.redirect,
      scope: code.scope,
      client: client,
      user: user
    })
  }

  // https://oauth2-server.readthedocs.io/en/latest/model/spec.html#getclient-clientid-clientsecret-callback
  getClient (clientId, clientSecret) {
    const query = { key: clientId }
    if (clientSecret) {
      query.secret = clientSecret
    }
    const client = clients.find(query).value()
    const user = users.getById(client.user_id).value()

    return Promise.resolve({
      id: client.id,
      name: client.name,
      redirectUris: client.redirects,
      grants: client.grants,
      scope: client.scope,
      user: user
    })
  }

  getUser (username, password) {
    const user = users.find({ username, password }).value()

    return Promise.resolve(user)
  }

  getUserFromClient (client) {
    return Promise.resolve(client.user)
  }

  saveToken (token, client, user) {
    accessTokens.insert({
      token: token.accessToken,
      expires: token.accessTokenExpiresAt,
      scope: token.scope,
      user_id: user.id,
      client_id: client.id
    }).write()
    if (token.refreshToken) {
      refreshTokens.insert({
        token: token.refreshToken,
        expires: token.refreshTokenExpiresAt,
        scope: token.scope,
        user_id: user.id,
        client_id: client.id
      }).write()
    }

    return Promise.resolve(Object.assign(token, { client, user }))
  }

  saveAuthorizationCode (code, client, user) {
    authorizationCodes.insert({
      code: code.authorizationCode,
      expires: code.expiresAt,
      redirect: code.redirectUri,
      scope: code.scope,
      user_id: user.id,
      client_id: client.id
    }).write()

    return Promise.resolve({
      authorizationCode: code.authorizationCode,
      expiresAt: code.expiresAt
    })
  }

  revokeToken (token) {
    refreshTokens.remove({ token: token.refreshToken }).write()

    return Promise.resolve(true)
  }

  revokeAuthorizationCode (code) {
    authorizationCodes.remove({ code: code.authorizationCode }).write()

    return Promise.resolve(true)
  }

  validateScope (user, client, scope) {
    // TODO: default scope
    scope = scope || 'info'

    // TODO: all scopes
    const requestedScopes = scope.split(/[,\s]/)

    // client scope validate
    if (client && client.scope !== '*') {
      const clientScopes = client.scope.split(/[,\s]/)
      if (!requestedScopes.every(s => clientScopes.indexOf(s) >= 0)) {
        return false
      }
    }

    // user scope validate
    console.log(user)
    if (user && user.scope !== '*') {
      const userScopes = user.scope.split(/[,\s]/)
      if (!requestedScopes.every(s => userScopes.indexOf(s) >= 0)) {
        return false
      }
    }

    return Promise.resolve(requestedScopes.join(' '))
  }

  verifyScope (accessToken, scope) {
    if (!accessToken.scope) {
      return false
    }
    const requested = scope.split(' ')
    const authorized = accessToken.scope.split(' ')
    const verified = requested.every(s => authorized.indexOf(s) >= 0)

    return Promise.resolve(verified)
  }
}
