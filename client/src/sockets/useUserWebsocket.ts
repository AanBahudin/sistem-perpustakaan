// hooks/useWebSocket.ts
import { useEffect } from "react"
import { toast } from "sonner"
import { useQueryClient } from "@tanstack/react-query"
import { useSearchParams } from "react-router-dom"

export function useUserWebSocket(pengguna: any) {

  const queryClient = useQueryClient()
  const [searchParams] = useSearchParams()
  const params = new URLSearchParams(searchParams).toString()

  let baseURL: null | string = ''

  useEffect(() => {
    if (!pengguna) return // kalau user belum ada, jangan connect

    const socket = new WebSocket(`ws://localhost:4000?userId=${pengguna.id}?role=pengguna`)

    socket.onopen = () => {
      console.log("✅ WebSocket connected")
    }

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data)

        console.log(data)
    
        // invalidate query
        if (data.type === 'PENGGUNA_PEMINJAMAN_DITOLAK' || data.type === 'PENGGUNA_PEMINJAMAN_DITERIMA') {
          queryClient.invalidateQueries({queryKey: ['peminjaman', params]})
          baseURL = `/my/data/peminjaman`
        }

        toast(data.title, {
          description: data.deskripsi,
          action: {
            label: "Lihat",
            onClick: () => window.location.href =  baseURL as string 
          }
        })
    }

    socket.onclose = () => {
      console.log("❌ WebSocket disconnected")
    }

    return () => {
      socket.close()
    }
  }, [pengguna, queryClient])
}
