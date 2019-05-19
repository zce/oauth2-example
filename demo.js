const { db, User, Client, AccessToken, RefreshToken, AuthorizationCode } = require('./server/models')

console.log(User.find())
console.log(User.get(1))
// console.log(Client.find())
// console.log(AccessToken.find())
// console.log(RefreshToken.find())
// console.log(AuthorizationCode.find())

