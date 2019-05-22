const { join } = require('path')
const express = require('express')

const app = express()

app.get('/', (req, res) => {
  res.redirect('/login')
})

app.get('/login', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'))
})

app.get('/login/callback', (req, res) => {
  const { code } = req.query
  res.send({ code })
})

if (!module.parent) {
  app.listen(4000, () => console.log('> http://localhost:4000'))
}

module.exports = app
