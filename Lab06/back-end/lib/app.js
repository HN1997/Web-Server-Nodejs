
const db = require('./db')
const express = require('express')
const cors = require('cors')
const app = express()
const cookieSession = require('cookie-session')

const fetch = require('node-fetch')

const client_id = 'Iv1.5f74e0a3544e9064'
const client_secret =  '45dfee8e9a8de0a7d7268432d86e4d72cbd79690'
const cookie_secret = 'bongocat'


app.use(require('body-parser').json())
app.use(cors())

app.get('/', (req, res) => {
  res.send([
    '<h1>ECE DevOps Chat</h1>'
  ].join(''))
})

// Channels

app.get('/channels', async (req, res) => {
  const channels = await db.channels.list()
  res.json(channels)
})

app.post('/channels', async (req, res) => {
  const channel = await db.channels.create(req.body)
  res.status(201).json(channel)
})

app.get('/channels/:id', async (req, res) => {
  const channel = await db.channels.get(req.params.id)
  res.json(channel)
})

app.put('/channels/:id', async (req, res) => {
  const channel = await db.channels.update(req.body)
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
  const user = await db.users.update(req.body)
  res.json(user)
})

/* Partie github */
app.use(cookieSession({
  secret : cookie_secret
}))

app.get('/login/github', (req,res)=>{
  const redirect_uri = "http://localhost:3000/login/github/callback"
  const url= `https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}`
  res.redirect(url)
})

async function getAccessToken(code) {
  const res = await fetch('https://github.com/login/oauth/access_token', {
  mehtod: "POST",
  headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      client_id,
      client_secret,
      code
    })
  })
  const data = await res.text()
  const params = new URLSearchParams(data)
  return params.get('acces_token')
}

async function getGithubUser (access_token){
  const req = await fetch('https://api.github.com/user', {
    headers: {
      Authorization: `bearer ${access_token}`
    }
  })
  const data = await req.json()
  return data
}

app.get('/login/github/callback', async (req,res)=>{
  const code = req.query.code
  const token = await getAccessToken(code)
  const githubData = await getGithubUser(token)
  if(githubData){
    req.session.githubId = githubData.id
    req.session.token = token
    res.redirect('/admin')
  } else{
    console.log('Error')
    res.send('Error happend')
  }
});

module.exports = app
