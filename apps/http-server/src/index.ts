import express from 'express'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '@repo/backend-common/config'
import middleware from './middleware'
import { prisma } from "@repo/db/client"
import { UserSchema, SignInSchema, CreateRoomSchema } from "@repo/common/types"

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

app.post('/signup', async (req,res) => {
    const body = req.body
    const parsed = UserSchema.safeParse(body)
    if(!parsed.success) {
        res.json({
            message: "Invalid inputs"
        })
        return
    }

    try {
        await prisma.user.create({
            data: {
                username: parsed.data.username,
                password: parsed.data.password,
                email: parsed.data.email
            }
        })
    } catch(e) {
        res.json({
            message: "User already exists"
        }).status(401)
        return
    }

})

app.post('/room', middleware, (req,res) => {
    res.json({
        "roomId": "12121"
    })
})

app.listen(3001)