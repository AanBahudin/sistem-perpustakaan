import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Loader } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { pustakawanTambahKondisi } from '@/actions/Pustakawan/pustakawanKondisiActionts'

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
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'

import { useState } from 'react'

const PengaturanTambahKondisiDialog = ({children} : {children: React.ReactNode}) => {

  const [openDialog, setOpenDialog] = useState(false)
  const [deskripsiLength, setDeskripsi] = useState('')
  const [denda, setDenda] = useState('')

  const handleOpen = (value: boolean) => {
    setOpenDialog(value)
  }

  const handleDeskripsi = (value: string) => {
    if (deskripsiLength.length <= 100) {
      setDeskripsi(value)
    }
  }

  const handleDenda = (value: string) => {
    let onlyNumbers = value.replace(/\D/g, "")
    if (onlyNumbers.startsWith("0")) {
      onlyNumbers = onlyNumbers.replace(/^0+/, "")
    }

    if (!onlyNumbers) return ""

    // Tambahkan pemisah ribuan
    const finalDendaFormat = new Intl.NumberFormat("id-ID").format(parseInt(onlyNumbers, 10))
    setDenda(finalDendaFormat)
  }

  const queryClient = useQueryClient()

  const mutation = useMutation({
     mutationFn: (data: any) => pustakawanTambahKondisi(data),
     onSuccess: () => {
      toast('Kondisi Berhasil Ditambahkan!')
      queryClient.invalidateQueries({queryKey: ['kondisi']})
      handleOpen(false)
    },
    onError: (error: any) => {
      const errMsg = error.response.data.message || 'Gagal menambahkan kondisi, Coba lagi nanti'
      toast('Terjadi kesalahan', {description: errMsg})
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
            <DialogTitle>Ubah Kondisi Buku?</DialogTitle>
            <DialogDescription className='text-xs text-muted-foreground'>Tambah informasi kondisi buku sesuai keadaan terkini. Pastikan data yang diubah sudah benar agar pencatatan koleksi tetap akurat.</DialogDescription>
          </DialogHeader>

          <section className="flex flex-col w-full gap-y-4">
            <main className='w-full flex items-center gap-x-4'>
              <div className='flex-1 flex flex-col gap-y-2'>
                <Label htmlFor='kondisi' className='!text-sm'>Kondisi Buku</Label>
                <Input 
                  required autoFocus
                  name='kondisi' placeholder='Kondisi'
                  className='text-muted-foreground !text-xs' />
              </div>

              <div className='flex-1 flex flex-col gap-y-2'>
                <Label htmlFor='denda' className='!text-sm'>Nominal Denda</Label>
                <section className="w-full flex items-center gap-x-2">
                  <p className='flex border h-full py-2 px-2.5 rounded-lg bg-primary items-center justify-center !text-xs'>Rp</p>
                  <Input 
                    required 
                    type='text' inputMode='numeric'
                    value={denda} onChange={(e) => handleDenda(e.target.value)}
                    name='denda' placeholder='Nominal denda yang harus dibayar'
                    className='text-muted-foreground !text-xs' />
                </section>
              </div>              
            </main>

            <main className='w-full flex-col flex gap-y-2'>
              <div className='w-full flex items-center justify-between'>
                <Label htmlFor='deskripsi' className='!text-sm'>Deskripsi</Label>
                <p className='text-muted-foreground text-xs'>{deskripsiLength.length} / 100</p>
              </div>
              <Textarea
                required maxLength={100} cols={30}
                value={deskripsiLength} onChange={(e) => handleDeskripsi(e.target.value)}
                name='deskripsi' placeholder='Penjelasan deskripsi sesuai dengan kondisi buku'
                className='max-w-full !text-xs text-muted-foreground resize-none whitespace-pre-wrap break-words' />
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

export default PengaturanTambahKondisiDialog