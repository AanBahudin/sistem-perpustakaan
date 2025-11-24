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
import { pustakawanCreateKategoriAction } from "@/actions/Pustakawan/Kategori"

const PengaturanTambahKategoriDialog  = ({children,} : {children: React.ReactNode}) => {
  
  // FOR OPENING DIALOG
  const [openDialog, setOpenDialog] = useState(false)
  const handleOpen = (value: boolean) => {
    setOpenDialog(value)
  }
  const queryClient = useQueryClient()

  const mutation = useMutation({
     mutationFn: (data: any) => pustakawanCreateKategoriAction(data),
     onSuccess: () => {
      toast('Kategori Berhasil Ditambahkan!')
      queryClient.invalidateQueries({queryKey: ['kategori']})
      handleOpen(false)
    },
    onError: (error: any) => {
      const errMsg = error.response.data.message || 'Gagal menambahkan kategori, Coba lagi nanti'
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
            <DialogTitle>Tambah Kategori</DialogTitle>
            <DialogDescription className='text-xs text-muted-foreground'>Tambahkan kategori baru sesuai kebutuhan koleksi perpustakaan. Pastikan nama kategori yang dimasukkan jelas dan benar agar memudahkan pengelompokan serta pencarian buku..</DialogDescription>
          </DialogHeader>

          <section className="flex flex-col w-full gap-y-4">
            <main className='flex-1 flex flex-col gap-y-2'>
              <Label htmlFor='kategoriBaru' className='text-sm'>Tambah Kategori Baru</Label>
              <Input 
                required autoFocus
                name='kategoriBaru' placeholder='Pemrograman, Algoritma'
                className='text-muted-foreground !text-xs' />
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

export default PengaturanTambahKategoriDialog 