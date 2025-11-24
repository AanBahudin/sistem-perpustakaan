import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Loader } from 'lucide-react'
import { Input } from '@/components/ui/input'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from 'sonner'


import { useState } from 'react'
import {pustakawaEditDurasiAction} from '@/actions/Pustakawan/Durasi'

const PengaturanDurasiDialog = ({children, dataDurasi} : {children: React.ReactNode, dataDurasi: any}) => {

  // GET ID DURASI
  const { _id: idDurasi } = dataDurasi
  
  // FOR OPENING DIALOG
  const [openDialog, setOpenDialog] = useState(false)
  const handleOpen = (value: boolean) => {
    setOpenDialog(value)
  }
  const queryClient = useQueryClient()

  const mutation = useMutation({
     mutationFn: (data: any) => pustakawaEditDurasiAction({data, idDurasi}),
     onSuccess: () => {
      toast('Durasi Berhasil Diperbaharui!')
      queryClient.invalidateQueries({queryKey: ['durasi']})
      handleOpen(false)
    },
    onError: (error: any) => {
      const errMsg = error.response.data.message || 'Gagal memperbaharui durasi, Coba lagi nanti'
      toast('Terjadi kesalahan', {description: errMsg})
      handleOpen(false)
    }
  })

  const handleSubmit = (e: any) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData)
    mutation.mutate(data)
  }
  
  return (
    <Dialog open={openDialog} onOpenChange={handleOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader className='mb-4'>
            <DialogTitle>Ubah Durasi Peminjaman Buku?</DialogTitle>
            <DialogDescription className='text-xs text-muted-foreground'>Perbarui informasi durasi peminjaman buku sesuai aturan terbaru. Pastikan data yang diubah sudah benar agar pengelolaan waktu peminjaman tetap tertib dan sesuai kebijakan perpustakaan.</DialogDescription>
          </DialogHeader>

          <section className="flex flex-col w-full gap-y-4">
            <main className='flex-1 flex flex-col gap-y-2'>
              <Label htmlFor='durasi' className='text-sm'>Durasi Peminjaman</Label>
              <div className='flex items-center gap-x-2'>
                <Input 
                  required autoFocus
                  type='number' min={0}
                  defaultValue={dataDurasi.durasi} 
                  name='durasi' 
                  className='text-muted-foreground !text-xs' />
                <p className='w-[200px] text-center h-9 text-xs flex items-center justify-center bg-primary/20 cursor-default uppercase  border rounded-lg'>Hari Peminjaman</p>
              </div>
            </main>
          </section>

          <DialogFooter className='mt-4'>
            <DialogClose asChild>
              <Button disabled={mutation.isPending} size='sm' variant="outline">Batal</Button>
            </DialogClose>
            <Button disabled={mutation.isPending} size='sm' type="submit" className='flex items-center gap-x-2'>
              {mutation.isPending && <Loader className='animate-spin' />}
              {mutation.isPending ? 'Menyimpan...' : 'Simpan'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default PengaturanDurasiDialog