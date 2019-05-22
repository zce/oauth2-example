// https://oauth2-server.readthedocs.io/en/latest/model/spec.html

const { clients, authorizationCodes, accessTokens, refreshTokens, scopes, users } = require('../models')

module.exports = class Model {
  constructor () { }

  // generateAccessToken (client, user, scope, callback) { }

  // generateRefreshToken (client, user, scope, callback) { }

  // generateAuthorizationCode (client, user, scope, callback) { }

  getAccessToken (accessToken, callback) {
    console.log('getAccessToken', arguments)

    const token = accessTokens.find({ token: accessToken }).value()
    token.user = users.getById(token.user_id)
    token.client = clients.getById(token.client_id)

    callback(null, token)
  }

  getRefreshToken (refreshToken, callback) {
    console.log('getRefreshToken', arguments)

    const token = refreshTokens.find({ token: refreshToken }).value()
    token.user = users.getById(token.user_id)
    token.client = clients.getById(token.client_id)

    callback(null, token)
  }

  getAuthorizationCode (authorizationCode, callback) {
    console.log('getAuthorizationCode', arguments)

    const code = authorizationCodes.find({ code: authorizationCode }).value()
    code.user = users.getById(code.user_id)
    code.client = clients.getById(code.client_id)

    callback(null, code)
  }

  // https://oauth2-server.readthedocs.io/en/latest/model/spec.html#getclient-clientid-clientsecret-callback
  getClient (clientId, clientSecret, callback) {
    console.log('getClient', arguments)

    const query = { key: clientId }
    if (clientSecret) {
      query.secret = clientSecret
    }
    const client = clients.find(query).value()

    callback(null, {
      id: client.id,
      redirectUris: client.redirects,
      grants: client.grants
    })
  }

  getUser (username, password, callback) {
    console.log('getUser', arguments)

    const user = users.find({ username, password }).value()

    callback(null, user)
  }

  getUserFromClient (client, callback) {
    console.log('getUserFromClient', arguments)

    const user = users.getById(client.user_id)

    callback(null, user)
  }

  saveToken (token, client, user, callback) {
    console.log('saveToken', arguments)

    accessTokens.push({
      token: token.accessToken,
      expires: token.accessTokenExpiresAt,
      scope: token.scope,
      user_id: user.id,
      client_id: client.id
    }).write()
    if (token.refreshToken) {
      refreshTokens.push({
        token: token.refreshToken,
        expires: token.refreshTokenExpiresAt,
        scope: token.scope,
        user_id: user.id,
        client_id: client.id
      }).write()
    }

    callback(Object.assign(token, { client, user }))
  }

  saveAuthorizationCode (code, client, user, callback) {
    console.log('saveAuthorizationCode', arguments)

    authorizationCodes.push({
      code: code.authorizationCode,
      expires: code.expiresAt,
      scope: code.scope,
      user_id: user.id,
      client_id: client.id
    }).write()

    callback(null, {
      authorization_code: code.authorizationCode,
      expires_in: Math.floor((code.expiresAt - new Date()) / 1000)
    })
  }

  revokeToken (token, callback) {
    console.log('revokeToken', arguments)

    refreshTokens.remove({ token: token.refreshToken }).write()

    callback(null, true)
  }

  revokeAuthorizationCode (code, callback) {
    console.log('revokeAuthorizationCode', arguments)

    authorizationCodes.remove({ code: code.authorizationCode }).write()

    callback(null, true)
  }

  validateScope (user, client, scope, callback) {
    console.log('validateScope', arguments)

    if (!scope.split(' ').every(s => ['read', 'write'].indexOf(s) >= 0)) {
      return false;
    }

    callback(null, scope)
    // callback(null, user.scope === client.scope ? scope : false)
  }

  verifyScope (accessToken, scope, callback) {
    console.log('verifyScope', arguments)

    if (!accessToken.scope) {
      return false
    }
    const requested = scope.split(' ')
    const authorized = accessToken.scope.split(' ')
    const verified = requested.every(s => authorized.indexOf(s) >= 0)

    callback(null, verified)
  }
}
