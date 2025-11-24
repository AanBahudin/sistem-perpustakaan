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
import { pustakawanTambahDurasi } from '@/actions/Pustakawan/Durasi/pustakawanDurasiActions'

const PengaturanTambahDurasiDialog = ({children} : {children: React.ReactNode}) => {

  // GET ID DURASI
  
  // FOR OPENING DIALOG
  const [openDialog, setOpenDialog] = useState(false)
  const handleOpen = (value: boolean) => {
    setOpenDialog(value)
  }
  const queryClient = useQueryClient()

  const mutation = useMutation({
     mutationFn: (data: any) => pustakawanTambahDurasi(data),
     onSuccess: () => {
      toast('Durasi Berhasil Ditambah!')
      queryClient.invalidateQueries({queryKey: ['durasi']})
      handleOpen(false)
    },
    onError: (error: any) => {
      const errMsg = error.response.data.message || 'Gagal menambah durasi, Coba lagi nanti'
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
            <DialogTitle>Tambah Durasi Peminjaman Buku</DialogTitle>
            <DialogDescription className='text-xs text-muted-foreground'>Tambahkan informasi durasi peminjaman buku sesuai kebutuhan. Pastikan data yang dimasukkan sudah benar agar sistem mencatat waktu peminjaman dengan tepat dan memudahkan pengelolaan koleksi.</DialogDescription>
          </DialogHeader>

          <section className="flex flex-col w-full gap-y-4">
            <main className='flex-1 flex flex-col gap-y-2'>
              <Label htmlFor='durasi' className='text-sm'>Durasi Peminjaman</Label>
              <div className='flex items-center gap-x-2'>
                <Input 
                  required autoFocus
                  type='number' min={0}
                  name='durasi' placeholder='Total hari peminjaman'
                  className='text-muted-foreground !text-xs' />
                <p className='w-[200px] text-center h-9 text-xs flex items-center justify-center bg-primary/20 cursor-default uppercase  border rounded-lg !placeholder:text-xs'>Hari Peminjaman</p>
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

export default PengaturanTambahDurasiDialog