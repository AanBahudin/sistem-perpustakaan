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

const AddCategoriDialog = () => {
  return (
    <Dialog>
      <form>
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
              <Input className='text-white selection:text-white  !text-xs' id="name-1" name="name" defaultValue="Pedro Duarte" />
            </div>
          </div>
          <DialogFooter className='!text-xs'>
            <DialogClose asChild>
              <Button variant="outline" className='text-white text-xs' size='sm'>Cancel</Button>
            </DialogClose>
            <Button type="submit" className='text-white text-xs' size='sm'>Simpan Kategori</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}

export default AddCategoriDialog