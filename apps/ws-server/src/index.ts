import WebSocket, { WebSocketServer } from 'ws';
import jwt, { JwtPayload } from "jsonwebtoken"
import { JWT_SECRET } from "@repo/backend-common/config"

const wss = new WebSocketServer({ port: 8080 });


wss.on('connection', function connection(ws, req) {
    const url = req.url;
    const queryString = url?.split('?')[1];
    const params = new URLSearchParams(queryString);
    const token = params.get('token') || "";
    const decoded = jwt.verify(token, JWT_SECRET)
    if(!decoded || !(decoded as JwtPayload).userId) {
        wss.close()
        return 
    }


    ws.on('error', console.error);

    ws.on('message', function message(data, isBinary) {
        wss.clients.forEach(function each(client) {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
            client.send(data, { binary: isBinary });
        }
        });
    });
});