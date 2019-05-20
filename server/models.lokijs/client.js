const db = require('./db')

const Client = db.addCollection('clients', {
  unique: ['name', 'clientId', 'clientSecret']
})

Client.insert([
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
])

module.exports = Client
