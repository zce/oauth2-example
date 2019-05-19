const clientStore = [
  {
    name: 'OAuth2 Client',
    website_url: 'https://github.com/zce/oauth2-example',
    privacy_url: 'https://github.com/zce/oauth2-example',
    clientId: 'oauth2-client',
    clientSecret: 'f657d916-0ad9-4b65-9976-3fe796bbdea0',
    redirectUris: ['http://localhost/login/callback'],
    grants: ['authorization_code', 'password', 'refresh_token', 'client_credentials'],
    scope: 'profile'
  }
]

const tokenStore = []

const userStore = [
  {
    id: 1,
    username: 'zce',
    password: 'wanglei'
  }
]

module.exports = class Model {
  constructor () {
    this.clients = clientStore
    this.tokens = tokenStore
    this.users = userStore
  }

  // generateAccessToken (client, user, scope, callback) { }

  // generateRefreshToken (client, user, scope, callback) { }

  // generateAuthorizationCode (client, user, scope, callback) { }

  getAccessToken (accessToken, callback) {
    console.log('getAccessToken', arguments)

    const tokens = this.tokens.filter(token => token.accessToken === accessToken)
    callback(null, tokens.length ? tokens[0] : false)
  }

  getRefreshToken (refreshToken, callback) {
    console.log('getRefreshToken', arguments)

    const tokens = this.tokens.filter(token => token.refreshToken === refreshToken)
    callback(null, tokens.length ? tokens[0] : false)
  }

  getAuthorizationCode (authorizationCode, callback) {
    console.log('getAuthorizationCode', arguments)

    callback(new Error('not impl'))
  }

  getClient (clientId, clientSecret, callback) {
    console.log('getClient', arguments)

    const client = this.clients.find(c => c.clientId === clientId)
    if (!clientSecret || client.clientSecret === clientSecret) {
      callback(null, client)
    } else {
      callback(null, false)
    }
  }

  getUser (username, password, callback) {
    console.log('getUser', arguments)

    const users = this.users.filter(user => user.username === username && user.password === password)
    callback(null, users.length ? users[0] : false)
  }

  getUserFromClient (client, callback) {
    console.log('getUserFromClient', arguments)

    callback(new Error('not impl'))
  }

  saveToken (token, client, user, callback) {
    console.log('saveToken', arguments)

    this.tokens.push({
      accessToken: token.accessToken,
      accessTokenExpiresAt: token.accessTokenExpiresAt,
      refreshToken: token.refreshToken,
      refreshTokenExpiresAt: token.refreshTokenExpiresAt,
      clientId: client.clientId,
      userId: user.id
    })
    callback()
  }

  saveAuthorizationCode (code, client, user, callback) {
    console.log('saveAuthorizationCode', arguments)

    callback(new Error('not impl'))
  }

  revokeToken (token, callback) {
    console.log('revokeToken', arguments)

    callback(new Error('not impl'))
  }

  revokeAuthorizationCode (code, callback) {
    console.log('revokeAuthorizationCode', arguments)

    callback(new Error('not impl'))
  }

  // validateScope (user, client, scope, callback) { }

  verifyScope (accessToken, scope, callback) {
    console.log('verifyScope', arguments)

    callback(new Error('not impl'))
  }
}
