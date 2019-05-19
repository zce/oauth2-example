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
    status: 'activated'
  },
  {
    slug: 'zce',
    username: 'zce',
    password: 'wanglei',
    nickname: 'Wang Lei',
    email: 'w@zce.me',
    mobile: '13266668888',
    status: 'activated'
  }
])

module.exports = User
