import { prodiLogoutAction } from '@/actions/Prodi/Auth'
import { Button } from '@/components/ui/button'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Loader, LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const ProdiSidebarFooter = () => {

  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const mutation = useMutation({
    mutationFn: () => prodiLogoutAction(),
    onSuccess: () => {
      queryClient.removeQueries()
      toast('Berhasil Keluar', {description: 'Anda berhasil keluar dari sistem perpustakaan!'})
      navigate('/prodi/login')
    },
    onError: (error: any) => {
      const errMsg = error.response.data.message || 'Gagal menambahakan pustakawan, Coba lagi nanti'
      toast('Terjadi kesalahan', {description: errMsg})
    }
  })

  const isLoading = mutation.isPending

  return (
    <section className='w-full'>
      <Button onClick={() => mutation.mutate()} className='w-full text-xs flex items-center justify-center gap-x-4' variant='outline'>
        {isLoading ? <Loader className='w-5 h-5 animate-spin' /> : <LogOut className='w-5 h-5' />}
        <p>{isLoading ? 'Sedang proses ....' : 'Logout'}</p>
      </Button>
    </section>
  )
}

export default ProdiSidebarFooter