import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Loader, Edit } from 'lucide-react'
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

import { pustakawanEditKategoriAction } from '@/actions/Pustakawan/Kategori'
import { useState } from 'react'

const PengaturanEditKategoriDialog  = ({dataKategori} : {dataKategori: any}) => {
  
  // FOR OPENING DIALOG
  const [openDialog, setOpenDialog] = useState(false)
  const handleOpen = (value: boolean) => {
    setOpenDialog(value)
  }
  const queryClient = useQueryClient()

  const mutation = useMutation({
     mutationFn: (data: any) => pustakawanEditKategoriAction(dataKategori.id, data),
     onSuccess: () => {
      toast('Kategori Berhasil Dperbahrui!')
      queryClient.invalidateQueries({queryKey: ['kategori']})
      handleOpen(false)
    },
    onError: (error: any) => {
      const errMsg = error.response.data.message || 'Gagal mengubah kategori, Coba lagi nanti'
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
        <Edit className='stroke-white w-3 h-3' />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader className='mb-4'>
            <DialogTitle>Edit Kategori</DialogTitle>
            <DialogDescription className='text-xs text-muted-foreground'>Edit kategori sesuai kebutuhan koleksi perpustakaan. Pastikan nama kategori yang dimasukkan jelas dan benar agar memudahkan pengelompokan serta pencarian buku..</DialogDescription>
          </DialogHeader>

          <section className="flex flex-col w-full gap-y-4">
            <main className='flex-1 flex flex-col gap-y-2'>
              <Label htmlFor='kategoriBaru' className='text-sm'>Edit Kategori</Label>
              <Input 
                required autoFocus
                defaultValue={dataKategori.nama}
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

export default PengaturanEditKategoriDialog 