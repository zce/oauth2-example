const express = require('express')

const app = express()

app.get('/', (req, res) => {
  res.status(200).send([])
})

app.get('/:id', (req, res) => {
  res.status(200).send({})
})

app.post('', (req, res) => {
  res.status(201).send({})
})

app.put('/:id', (req, res) => {
  res.status(200).send({})
})

app.patch('/:id', (req, res) => {
  res.status(200).send({})
})

app.delete('/:id', (req, res) => {
  res.status(204).send({})
})

module.exports = app
