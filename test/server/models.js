const { clients, authorization_codes, access_tokens, refresh_tokens, scopes, users, posts } = require('../../server/models')

clients.insert({ client_id: 'sd' }).write()
clients.insert({ client_id: 'sd' }).write()
clients.insert({ client_id: 'sd' }).write()
console.log(clients.value())
console.log(authorization_codes.value())
console.log(access_tokens.value())
console.log(refresh_tokens.value())
console.log(scopes.value())
console.log(users.value())
console.log(posts.value())

