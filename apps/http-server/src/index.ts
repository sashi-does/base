import express, { Request, Response } from 'express'
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
                email: parsed.data.email,
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

app.post('/room', middleware, async (req: Request, res: Response) => {
    const userId = req.userId
    const parsed = CreateRoomSchema.safeParse(req.body)
    if(!parsed.success) {
        res.json({
            message: "Invalid inputs"
        })
        return
    }
    if(!userId) {
        res.json({
            message: "Unauthenticated"
        })
        return
    }
    try {
        const room = await prisma.room.create({
            data: {
                adminId: userId,
                slug: parsed.data.name
            }
        })
        res.json({
            message: "Room created successfully",
            roomId: room.id
        })
    } catch(e) {
        res.json({
            message: "Room already exists with this name"
        })
    }
    
})

app.get('/chats/:roomId', async (req,res) => {
    try {
        const { roomId } = req.params
    const messages = await prisma.chat.findMany({
        where: {
            roomId: parseInt(roomId as string)
        },
        orderBy : {
            id: "desc"
        },
        take: 50
    })
    res.json({
        chats: messages
    })
    } catch (e) {
        res.json({
            message: "error"
        })
    }
})

app.listen(3001)