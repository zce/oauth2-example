const db = require('./db')

const User = db.addCollection('users', {
  unique: ['slug', 'username']
})

User.insert([
  {
    slug: 'admin',
    username: 'admin',
    password: 'wanglei',
    nickname: 'Administrator',
    email: 'admin@zce.me',
    mobile: '13266668888',
    status: ''
  },
  {
    slug: 'zce',
    username: 'zce',
    password: 'wanglei',
    nickname: 'Wang Lei',
    email: 'w@zce.me',
    mobile: '13266668888',
    status: ''
  }
])

module.exports = User
