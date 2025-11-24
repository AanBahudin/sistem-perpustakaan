import penggunaLogoutAction from "@/actions/Pengguna/Auth/penggunaLogoutAction"
import { Button } from "@/components/ui/button"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Loader } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

const PustakawanSidebarFooter = () => {

  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const mutation = useMutation({
    mutationFn: penggunaLogoutAction,
    onSuccess: () => {
      queryClient.removeQueries()
      navigate('/pustakawan/login')
    },
    onError: () => {
      toast('Terjadi kesalahan', {description: 'TIdak dapat keluar, coba lagi nanti'})
    }
  })

  const isLoading : boolean = mutation.isPending
  if (isLoading) {
    return (
      <Button disabled className='w-full flex items-center gap-x-4 py-3 px-10 rounded border disabled:cursor-not-allowed'>
        <Loader className="animate-spin" />
        <p className="text-xs">Sedang Keluar</p>
      </Button>
    )
  }


  return (
    <Button onClick={() => mutation.mutate()} className='w-full flex items-center gap-x-4 py-3 px-10 rounded border'>
      <p className={`text-xs font-semibold text-white`}>Keluar</p>
    </Button>
  )
}

export default PustakawanSidebarFooter