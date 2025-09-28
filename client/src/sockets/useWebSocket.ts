// hooks/useWebSocket.ts
import { useEffect } from "react"
import { toast } from "sonner"
import { useQueryClient } from "@tanstack/react-query"
import { useSearchParams } from "react-router-dom"

export function useWebSocket() {
  const queryClient = useQueryClient()
  const [searchParams] = useSearchParams()
  const params = new URLSearchParams(searchParams).toString()

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:4000")

    socket.onopen = () => {
      console.log("✅ WebSocket connected")
    }

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data)
        toast(data.title, {
          description: data.deskripsi,
          action: {
            label: "Lihat",
            onClick: () => window.location.href =  `/pustakawan/pengajuan/${data.pengajuan}/${data.data._id}` 
          }
        })

        // invalidate query supaya tabel langsung refresh
        queryClient.invalidateQueries({ queryKey: ['semua', 'peminjaman', params] })
    }

    socket.onclose = () => {
      console.log("❌ WebSocket disconnected")
    }

    return () => {
      socket.close()
    }
  }, [queryClient])
}
