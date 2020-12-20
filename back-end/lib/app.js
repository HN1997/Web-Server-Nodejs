
const db = require('./db')
const express = require('express')
const cors = require('cors')
const authenticator = require('./authenticator')

const app = express()
const authenticate = authenticator({
  jwks_uri: 'http://127.0.0.1:5556/dex/keys'
})

app.use(require('body-parser').json())
app.use(cors())

app.get('/', (req, res) => {
  res.send([
    '<h1>ECE DevOps Chat</h1>'
  ].join(''))
})

// Channels

app.get('/channels', authenticate, async (req, res) => {
  const channels = await db.channels.list(req.user.email)
  res.json(channels)
})

app.post('/channels', async (req, res) => {
  //console.log("ajout channel params")
  //console.log(req.body)
  const channel = await db.channels.create(req.body)
  res.status(201).json(channel)
})

app.get('/channels/:id', async (req, res) => {
  const channel = await db.channels.get(req.params.id)
  res.json(channel)
})

app.put('/channels/:id', async (req, res) => {
  const channel = await db.channels.update(req.params.id,req.body)
  res.json(channel)
})

app.delete('/channels/:id', async (req, res) => {
  
  const channel = await db.channels.delete(req.params.id)
  res.json(channel)
})

// Messages

app.get('/channels/:id/messages', async (req, res) => {
  const messages = await db.messages.list(req.params.id)
  res.json(messages)
})

app.post('/channels/:id/messages', async (req, res) => {
  const message = await db.messages.create(req.params.id, req.body)
  res.status(201).json(message)
})
app.delete('/messages/:id/:idmsg', async (req, res) => {
  console.log("app")
  //console.log(req.params.id)
  //console.log(req.params.idmsg)
  const message = await db.messages.delete(req.params.id,req.params.idmsg)
  res.json(message)
})

// Users

app.get('/users', async (req, res) => {
  const users = await db.users.list()
  res.json(users)
})

app.post('/users', async (req, res) => {
  const user = await db.users.create(req.body)
  res.status(201).json(user)
})

app.get('/users/:id', async (req, res) => {
  const user = await db.users.get(req.params.id)
  res.json(user)
})

app.put('/users/:id', async (req, res) => {
  const user = await db.users.update(req.params.id,req.body)
  res.json(user)
})

app.delete('/users/:id', async (req, res) => {
  
  const user = await db.users.delete(req.params.id)
  res.json(user)
})

module.exports = app
