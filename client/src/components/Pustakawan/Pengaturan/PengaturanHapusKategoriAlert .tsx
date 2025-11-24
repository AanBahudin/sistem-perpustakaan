import { Button } from '@/components/ui/button'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Loader, X } from 'lucide-react'

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
import { pustakawanDeleteKategoriAction } from '@/actions/Pustakawan/Kategori'

const PengaturanHapusKategoriAlert = ({idKategori} : {idKategori: string}) => {

  const [isOpen, setOpen] = useState(false)
  const handleOpen = (value: boolean) => {
    setOpen(value)
  }

  const queryClient = useQueryClient()
  
  const mutation = useMutation({
    mutationFn: () => pustakawanDeleteKategoriAction(idKategori),
    onSuccess: () => {
      toast('Kategori Berhasil Dihapus!')
      queryClient.invalidateQueries({queryKey: ['kategori']})
      handleOpen(false)
    },
    onError: (error: any) => {
      const errMsg = error.response.data.message || 'Gagal menghapus kategori, Coba lagi nanti'
      toast('Terjadi kesalahan', {description: errMsg})
      handleOpen(false)
    }
  })

  const handleClick = async() => {
    mutation.mutate()
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={handleOpen}>
      <AlertDialogTrigger asChild>
        <X className='stroke-destructive w-3 h-3' />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Anda yakin menghapus kategori ini?</AlertDialogTitle>
          <AlertDialogDescription>
            Tindakan ini tidak dapat dipulihkan, Dengan menekan <strong>Hapus</strong>, kategori buku akan terhapus secara permanen
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={mutation.isPending}>Batal</AlertDialogCancel>
          <Button disabled={mutation.isPending} variant='destructive'  onClick={handleClick} className='flex items-center gap-x-2'>
            {mutation.isPending && <Loader className='animate-spin' />}
            {mutation.isPending ? 'Menghapus...' : 'Hapus'}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
} 

export default PengaturanHapusKategoriAlert