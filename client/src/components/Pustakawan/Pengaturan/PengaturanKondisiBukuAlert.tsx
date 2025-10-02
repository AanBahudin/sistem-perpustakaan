import { Button } from '@/components/ui/button'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Loader } from 'lucide-react'
import { pustakawanHapusKondisi } from '@/actions/Pustakawan/pustakawanKondisiActionts'

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

const PengaturanKondisiBukuAlert = ({children, idKondisi} : {children: React.ReactNode, idKondisi: string}) => {

  const [openDialog, setOpenDialog] = useState(false)
  const handleOpen = (value: boolean) => {
    setOpenDialog(value)
  }

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: () => pustakawanHapusKondisi(idKondisi),
    onSuccess: () => {
      toast('Kondisi Berhasil Dihapus!')
      queryClient.invalidateQueries({queryKey: ['kondisi']})
      handleOpen(false)
    },
    onError: (error: any) => {
      const errMsg = error.response.data.message || 'Gagal menghapus kondisi, Coba lagi nanti'
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
          <AlertDialogTitle>Anda yakin menghapus kondisi ini?</AlertDialogTitle>
          <AlertDialogDescription>
            Tindakan ini tidak dapat dipulihkan, Dengan menekan <strong>Hapus</strong>, kondisi akan terhapus secara permanen
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel  disabled={mutation.isPending}>Batal</AlertDialogCancel>
          <Button disabled={mutation.isPending} variant='destructive' type='submit' onClick={handleClick} className='flex items-center gap-x-2'>
            {mutation.isPending && <Loader className='animate-spin' />}
            {mutation.isPending ? 'Menyimpan...' : 'Simpan'}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
} 

export default PengaturanKondisiBukuAlert