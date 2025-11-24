import { Button } from '@/components/ui/button'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Loader } from 'lucide-react'

import { toast } from 'sonner'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { useState } from 'react'
import { pustakawanHapusDurasi } from '@/actions/Pustakawan/Durasi/pustakawanDurasiActions'

const PengaturanDurasiPinjamAlert = ({children, idDurasi} : {children: React.ReactNode, idDurasi: string}) => {

  const [openDialog, setOpenDialog] = useState(false)
  const handleOpen = (value: boolean) => {
    setOpenDialog(value)
  }

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: () => pustakawanHapusDurasi(idDurasi),
    onSuccess: () => {
      toast('Durasi Berhasil Dihapus!')
      queryClient.invalidateQueries({queryKey: ['durasi']})
      handleOpen(false)
    },
    onError: (error: any) => {
      const errMsg = error.response.data.message || 'Gagal menghapus durasi, Coba lagi nanti'
      toast('Terjadi kesalahan', {description: errMsg})
      handleOpen(false)
    }
  })

  const handleClick = async() => {
    mutation.mutate()
  }

  return (
    <AlertDialog open={openDialog} onOpenChange={handleOpen} defaultOpen={openDialog}>
      <AlertDialogTrigger asChild>
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Anda yakin menghapus durasi ini?</AlertDialogTitle>
          <AlertDialogDescription>
            Tindakan ini tidak dapat dipulihkan, Dengan menekan <strong>Hapus</strong>, opsi durasi peminjaman akan terhapus secara permanen
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel  disabled={mutation.isPending}>Batal</AlertDialogCancel>
          <Button disabled={mutation.isPending} variant='destructive' type='submit' onClick={handleClick} className='flex items-center gap-x-2'>
            {mutation.isPending && <Loader className='animate-spin' />}
            {mutation.isPending ? 'Menghapus...' : 'Hapus'}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
} 

export default PengaturanDurasiPinjamAlert