import express from 'express'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '@repo/backend-common/config'
import middleware from './middleware'
import { prisma } from "@repo/db/client"
import { UserSchema, SignInSchema, CreateRoomSchema } from "@repo/common/types"

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.post('/signin', async (req, res) => {
    const parsed = SignInSchema.safeParse(req.body)
    if (!parsed.success) {
        res.json({
            message: "Failed to sign in"
        })
        return
    }
    try {
        const user = await prisma.user.findFirst({
            where: {
                username: parsed.data.username,
            }
        })
        if(user) {
            const token = jwt.sign({userId: user.id}, JWT_SECRET)
            res.json({
                token
            })
            return
        }
        res.json({
            message: "User not found"
        })
    } catch(e) {
        res.json({
            message: "Error occurred while signing in"
        })
    }
})

app.post('/signup', async (req, res) => {
    const body = req.body
    const parsed = UserSchema.safeParse(body)
    if (!parsed.success) {
        res.json({
            message: "Invalid inputs"
        })
        return
    }

    try {
        const user = await prisma.user.create({
            data: {
                username: parsed.data.username,
                password: parsed.data.password,
                email: parsed.data.email
            }
        })
        res.json({
            message: "User created successfully"
        })
    } catch (e) {
        if(e instanceof Error) {
            console.log(e.message)
        }
        res.json({
            message: "User already exists"
        }).status(401)
        return
    }

})

app.post('/room', middleware, (req, res) => {
    res.json({
        "roomId": "12121"
    })
})

app.listen(3001)