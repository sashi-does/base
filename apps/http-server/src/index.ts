import express from 'express'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '@repo/backend-common/config'
import middleware from './middleware'

const app = express()

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.post('/signin', (req,res) => {
    const userId = 1
    const token = jwt.sign({
        userId
    }, JWT_SECRET)
    res.json({
        token
    })
})

app.post('/signup', (req,res) => {

})

app.post('/room', middleware, (req,res) => {
    res.json({
        "roomId": "12121"
    })
})

app.listen(3001)