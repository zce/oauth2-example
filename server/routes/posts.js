const express = require('express')

const { posts } = require('../models')
const oauth = require('../oauth')

const app = express()

app.get('/', oauth.authenticate({ scope: 'posts:read' }), (req, res) => {
  const postList = posts.find().value()
  res.status(200).send(postList)
})

app.get('/:id', oauth.authenticate({ scope: 'posts:read' }), (req, res) => {
  res.status(200).send({})
})

app.post('', oauth.authenticate({ scope: 'posts:create' }), (req, res) => {
  res.status(201).send({})
})

app.put('/:id', oauth.authenticate({ scope: 'posts:update' }), (req, res) => {
  res.status(200).send({})
})

app.patch('/:id', oauth.authenticate({ scope: 'posts:update' }), (req, res) => {
  res.status(200).send({})
})

app.delete('/:id', oauth.authenticate({ scope: 'posts:delete' }), (req, res) => {
  res.status(204).send({})
})

module.exports = app
