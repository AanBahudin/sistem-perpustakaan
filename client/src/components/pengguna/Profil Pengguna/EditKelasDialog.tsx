import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Pencil } from "lucide-react"
import { kelasEnum } from "@/utils/constants"
import useUpdateInfoPengguna from "@/hooks/fetchHooks/penggunaHooks/profil/useUpdateInfoPengguna"

const EditKelasDialog = ({data} : {data: any}) => {

    const { isLoading, mutationFn, open, handleOpen } = useUpdateInfoPengguna({errMsg: 'Tidak dapat memperbaharui kelas', successMsg: 'Kelas berhasil diperbaharui'})
    
    return (
        <section className='col-span-1 grid items-center gap-1.5'>
            <Label className='font-normal'>Kelas Pengguna</Label>
            
            <main className='flex w-full gap-x-2 items-center justify-center'>
                <Input value={data.kelas} readOnly={true} className='mt-1 text-muted-foreground' />
                <Dialog onOpenChange={handleOpen} open={open}>
                    <DialogTrigger asChild>
                        <Button variant='default' type="button"><Pencil className='stroke-primary-foreground dark:stroke-white' /></Button>
                    </DialogTrigger>

                    <DialogContent className="sm:max-w-[425px]">
                        <form onSubmit={mutationFn} className="grid gap-4 py-4">
                            <DialogHeader>
                                <DialogTitle className="capitalize">Perbaharui Kelas</DialogTitle>
                                <DialogDescription>Pastikan kelas anda sesuai dengan data kemahasiswaan</DialogDescription>
                            </DialogHeader>

                            <div className="grid grid-cols-2 items-center gap-4">
                                <Label htmlFor='kelas' className="text-right capitalize"> Kelas </Label>
                                <Select name='kelas' defaultValue={data.kelas}>
                                    <SelectTrigger className="w-full col-span-3">
                                        <SelectValue placeholder="Pilih kelas anda" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Kelas</SelectLabel>
                                            {kelasEnum.map(item => <SelectItem value={item}>{item}</SelectItem>)}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>

                            <Button type="submit" disabled={isLoading} className='text-white mt-6 place-self-end w-fit'>
                                {isLoading ? 'Menyimpan...' : 'Simpan'}
                            </Button>

                        </form>

        
                    </DialogContent>
                </Dialog>
            </main>

        </section>
  )
}

export default EditKelasDialog