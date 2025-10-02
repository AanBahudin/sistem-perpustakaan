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
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createKategori } from "@/actions/kategoriAction"
import { toast } from "sonner"
import { useState } from "react"

const AddCategoriDialogEdit = () => {

  const [open, setOpen] = useState(false)
  const [kategori, setKategori] = useState('Pemrograman')
  const handleOpen = () => {
    setOpen(!open)
  }
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: (data: any) => createKategori(data),
    onSuccess: (data: any) => {
      toast('Berhasil Ditambahkan', {description: `kategori Baru ditambahkan`})
      queryClient.invalidateQueries({queryKey: ['kategori']})
      setOpen(false)
    },
    onError: () => {
      toast('Terjadi kesalahan', {description: 'Tidak dapat menambahkan kategori'})
      setOpen(false)
    }
  })

  const isLoading = mutation.isPending
  const handleSubmit = async() => {
    mutation.mutate({kategoriBaru: kategori})
  }
  
  return (
    <Dialog defaultOpen={false} onOpenChange={handleOpen} open={open}>
      <DialogTrigger asChild>
        <Button className='text-xs text-white mt-2' size='sm'>Tambah Kategori</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Tambah Kategori Buku</DialogTitle>
          <DialogDescription className='text-xs'>
            Masukkan kategori yang relevan agar buku mudah ditemukan oleh pembaca.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name-1">Kategori</Label>
            <Input className='text-white selection:text-white  !text-xs' 
              id="name-1" name="kategoriBaru" 
              value={kategori} onChange={(e) => setKategori(e.target.value)} 
              defaultValue="Pemrograman" />
          </div>
        </div>

        <DialogFooter className='!text-xs'>
          <DialogClose asChild>
            <Button disabled={isLoading} variant="outline" className='text-white text-xs' size='sm'>Cancel</Button>
          </DialogClose>

          <Button disabled={isLoading} type="button" onClick={handleSubmit} className='text-white text-xs' size='sm'>
            {isLoading ? 'Menyimpan ....' : 'Simpan Kategori'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AddCategoriDialogEdit