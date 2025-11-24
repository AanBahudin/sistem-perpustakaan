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
import pustakawanEditNominalDenda from '@/actions/Pustakawan/Denda/pustakawanEditDenda'

const PengaturanEditDendaDialog = ({children, dataDenda} : {children: React.ReactNode, dataDenda: any}) => {

  // GET ID DURASI
  const { denda, _id: idDenda } = dataDenda
  
  // FOR OPENING DIALOG
  const [openDialog, setOpenDialog] = useState(false)
  const handleOpen = (value: boolean) => {
    setOpenDialog(value)
  }
  const queryClient = useQueryClient()

  const mutation = useMutation({
     mutationFn: (data: any) => pustakawanEditNominalDenda(data, idDenda),
     onSuccess: () => {
      toast('Denda Berhasil Diperbaharui!')
      queryClient.invalidateQueries({queryKey: ['denda']})
      handleOpen(false)
    },
    onError: (error: any) => {
      const errMsg = error.response.data.message || 'Gagal memperbaharui denda, Coba lagi nanti'
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
            <DialogTitle>Ubah Denda Keterlambatan</DialogTitle>
            <DialogDescription className='text-xs text-muted-foreground'>Perbarui nominal denda keterlambatan sesuai kebijakan terbaru. Pastikan nilai yang dimasukkan sudah benar agar perhitungan denda tetap akurat dan adil bagi peminjam.</DialogDescription>
          </DialogHeader>

          <section className="flex flex-col w-full gap-y-4">
            <main className='flex-1 flex flex-col gap-y-2'>
              <Label htmlFor='denda' className='text-sm'>Denda Keterlambatan</Label>
              <div className='flex items-center gap-x-2 flex-row-reverse'>
                <Input 
                  required autoFocus
                  type='number' min={100}
                  defaultValue={denda}
                  name='denda' placeholder='Total hari peminjaman'
                  className='text-muted-foreground !text-xs' />
                <p className='w-[60px] text-center h-9 text-lg flex items-center justify-center bg-primary/20 cursor-default border rounded-lg !placeholder:text-xs'>Rp</p>
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

export default PengaturanEditDendaDialog