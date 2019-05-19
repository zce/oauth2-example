// https://oauth2-server.readthedocs.io/en/latest/model/spec.html

const { Client, AccessToken, RefreshToken, AuthorizationCode, User } = require('../models')

module.exports = class Model {
  constructor () { }

  // generateAccessToken (client, user, scope, callback) { }

  // generateRefreshToken (client, user, scope, callback) { }

  // generateAuthorizationCode (client, user, scope, callback) { }

  getAccessToken (accessToken, callback) {
    console.log('getAccessToken', arguments)

    const token = AccessToken.findOne({ accessToken })
    token.user = User.get(token.user_id)
    token.client = Client.get(token.client_id)
    token.id = token.$loki

    callback(null, token)
  }

  getRefreshToken (refreshToken, callback) {
    console.log('getRefreshToken', arguments)

    const token = RefreshToken.findOne({ refreshToken })
    token.user = User.get(token.user_id)
    token.client = Client.get(token.client_id)
    token.id = token.$loki

    callback(null, token)
  }

  getAuthorizationCode (authorizationCode, callback) {
    console.log('getAuthorizationCode', arguments)

    const code = AuthorizationCode.findOne({ authorizationCode })
    code.id = code.$loki

    callback(null, code)
  }

  getClient (clientId, clientSecret, callback) {
    console.log('getClient', arguments)

    const query = { clientId }
    if (clientSecret) {
      query.clientSecret = clientSecret
    }
    const client = Client.findOne(query)
    client.id = client.$loki

    callback(null, client)
  }

  getUser (username, password, callback) {
    console.log('getUser', arguments)

    const user = User.findOne({ username, password })
    user.id = user.$loki

    callback(null, user)
  }

  getUserFromClient (client, callback) {
    console.log('getUserFromClient', arguments)

    const user = User.get(client.id)
    user.id = user.$loki

    callback(null, user)
  }

  saveToken (token, client, user, callback) {
    console.log('saveToken', arguments)

    AccessToken.push({
      accessToken: token.accessToken,
      expires: token.accessTokenExpiresAt,
      clientId: client.id,
      userId: user.id,
      scope: token.scope
    })


    callback()
  }

  saveAuthorizationCode (code, client, user, callback) {
    console.log('saveAuthorizationCode', arguments)

    AuthorizationCode.insert({
      expires: code.expires,
      code: code.code,
      scope: code.scope,
      client_id: client.id,
      user_id: user.id
    })
    callback(new Error('not impl'))
  }

  revokeToken (token, callback) {
    console.log('revokeToken', arguments)

    const removed = RefreshToken.findAndRemove({ refreshToken: token.refreshToken })
    callback(null, !!removed)
  }

  revokeAuthorizationCode (code, callback) {
    console.log('revokeAuthorizationCode', arguments)

    const removed = AuthorizationCode.findAndRemove({ authorizationCode: code.authorizationCode })
    callback(null, !!removed)
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
