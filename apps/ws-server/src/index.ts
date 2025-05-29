import WebSocket, { WebSocketServer } from 'ws';
import jwt, { JwtPayload } from "jsonwebtoken"
import { JWT_SECRET } from "@repo/backend-common/config"
import { prisma } from "@repo/db/client"

interface User {
    ws: WebSocket
    rooms: string[]
    userId: string
}

interface UserMessage {
    type: string,
    roomId?: string,
    message?: string
}

// world's inefficient way to manage users
const users: User[] = []

const wss = new WebSocketServer({ port: 8080 });



wss.on('connection', function connection(ws, req) {
    try {
        const url = req.url;
        const queryString = url?.split('?')[1];
        const params = new URLSearchParams(queryString);
        const token = params.get('token') || "";
        if(!token) {
            ws.close()
            return
        }
        
        let verified;
        try {
            verified = jwt.verify(token, JWT_SECRET)
        } catch (e) {
            ws.close()
            return
        }
        
        if (!verified || !(verified as JwtPayload).userId) {
            ws.close()
            return
        }

        const userId = (verified as JwtPayload).userId as string

        users.push({
            ws,
            rooms: [],
            userId
        })

        ws.on("message", async (data) => {
            const parsed: UserMessage = JSON.parse(data as unknown as string)
            if (parsed.type === "chat") {
                const roomId = parsed.roomId
                const message = parsed.message
                if (roomId && message) {
                    await prisma.chat.create({
                        data: {
                            userId,
                            message: message as string,
                            roomId: parseInt(roomId)
                        }
                    })
                }

                users.forEach(x => {
                    if (x.rooms.includes(roomId as string)) {
                        x.ws.send(JSON.stringify({
                            message,
                            roomId,
                            type: "chat"
                        }))
                    }
                })
            }
            if (parsed.type === "join_room") {
                const user = users.find(x => x.ws === ws)
                if (!user) return
                if (parsed.roomId) user?.rooms.push(parsed.roomId)
            }
            if (parsed.type === "leave_room") {
                const user = users.find(x => x.ws === ws)
                if (!user) return
                user.rooms = user.rooms.filter(x => x !== parsed.roomId)
            }
        })

        ws.on('error', console.error);

    } catch (e) {
        return null
    }


});