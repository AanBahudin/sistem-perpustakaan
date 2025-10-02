import { WebSocketServer } from "ws"
import url from 'url'

let wss: WebSocketServer | null = null
const userClients = new Map<string, any>() // userId → socket
const pustakawanClients = new Set<any>()   // semua pustakawan

export const ServeSocketConnection = (server: any) => {
  wss = new WebSocketServer({ server })

  wss.on("connection", (connection, request) => {
    const { query } = url.parse(request.url!, true)
    console.log(query)
    const userId = query.userId as string
    const role = query.role as string

    if (!userId || !role) {
      connection.close()
      return
    }

    if (role === 'pustakawan') {
        pustakawanClients.add(connection)
    } else {
        userClients.set(userId, connection)
    }
  })

  return wss
}

// helper untuk ambil instance dari file lain
export const getWss = () => {
  if (!wss) {
    throw new Error("WebSocketServer belum diinisialisasi")
  }
  return wss
}

export const sendNotificationToUser = (userId: string, payload: any) => {
  const client = userClients.get(userId)
  if (client && client.readyState === 1) {
    console.log(client)
    console.log(userId)
    console.log(payload)
    client.send(JSON.stringify(payload))
  }
}