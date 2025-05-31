import { useEffect, useState } from "react";
import { WS_URL } from "../app/config";

export function useSocket() {
    const [loading, setLoading] = useState(true)
    const [socket, setSocket] = useState<WebSocket>()

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) {
            setLoading(false)
            return
        }

        const ws = new WebSocket(`${WS_URL}?token=${token}`)

        ws.onopen = () => {
            setLoading(false)
            setSocket(ws)
        }

        ws.onerror = (error) => {
            console.error('WebSocket error:', error)
            setLoading(false)
        }

        ws.onclose = () => {
            setSocket(undefined)
            setLoading(false)
        }

        return () => {
            if (ws.readyState === WebSocket.OPEN) {
                ws.close()
            }
        }
    }, [])

    return {
        socket,
        loading
    }
}