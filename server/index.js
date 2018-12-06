const express = require('express')
const session = require('express-session')
const massive = require('massive')
const bodyParser = require('body-parser')
require('dotenv').config()

const AuthCtrl = require('./controllers/AuthCtrl')
const PostMCtrl = require('./controllers/PostMessageCtrl')
const PostECtrl = require('./controllers/PostErrorCtrl')
const PredictionsCtrl = require('./controllers/PredictionCtrl')

const app = express()

const { CONNECTION_STRING, SERVER_PORT: PORT, SESSION_SECRET } = process.env


massive(CONNECTION_STRING).then(db => {
  app.set('db', db)
  console.log('db connected!')
})

app.use(bodyParser.json())
app.use( express.static( `${__dirname}/../build` ) )
app.use(session({
  secret: SESSION_SECRET,
  resave: true,
  saveUninitialized: false,
  cookie: {
    maxAge: 7776000000
}
}))

app.post('/auth/login', AuthCtrl.login)
app.post('/auth/register', AuthCtrl.register)
app.get('/auth/logout', AuthCtrl.logout)
app.get('/auth/currentUser', AuthCtrl.getCurrentUser)

app.post('/api/messages', PostMCtrl.create)
app.get('/api/messages', PostMCtrl.read)
app.put('/api/messages/:id', PostMCtrl.update)
app.delete('/api/messages/:id', PostMCtrl.delete)

app.post('/api/errors', PostECtrl.create)
app.get('/api/errors', PostECtrl.read)
app.put('/api/errors/:id', PostECtrl.update)
app.delete('/api/errors/:id', PostECtrl.delete)

app.post('/api/predictions', PredictionsCtrl.create)
app.get('/api/predictions', PredictionsCtrl.read)
app.put('/api/predictions/:id', PredictionsCtrl.update)

app.listen(PORT, () => {
  console.log('listening on port', PORT)
})
