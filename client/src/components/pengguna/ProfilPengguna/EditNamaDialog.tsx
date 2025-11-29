import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Pencil } from "lucide-react"
import useUpdateInfoPengguna from "@/hooks/fetchHooks/penggunaHooks/profil/useUpdateInfoPengguna"


const EditNamaDialog = ({data} : {data: any}) => {

    const { isLoading, mutationFn, open, handleOpen } = useUpdateInfoPengguna({errMsg: 'Tidak dapat memperbaharui nama', successMsg: 'Nama berhasil diperbaharui'})
    
    return (
        <section className='col-span-1 grid items-center gap-1.5'>
            <Label className='font-normal'>Nama Lengkap</Label>
            
            <main className='flex w-full gap-x-2 items-center justify-center'>
                <Input value={data.nama} readOnly={true} className='mt-1 text-muted-foreground' />
                <Dialog onOpenChange={handleOpen} open={open}>
                    <DialogTrigger asChild>
                        <Button variant='default' type="button"><Pencil className='stroke-primary-foreground dark:stroke-white' /></Button>
                    </DialogTrigger>

                    <DialogContent className="sm:max-w-[425px]">
                        <form onSubmit={mutationFn} className="grid gap-4 py-4">
                            <DialogHeader>
                                <DialogTitle className="capitalize">Perbaharui Nama Lengkap</DialogTitle>
                                <DialogDescription>Pastikan nama anda sesuai dengan data kemahasiswaan</DialogDescription>
                            </DialogHeader>

                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor='nama' className="text-right capitalize"> Nama Lama </Label>
                                <Input readOnly defaultValue={data?.nama} className="col-span-3 selection:text-white" />

                                <Label htmlFor='nama' className="text-right capitalize"> Nama Baru </Label>
                                <Input required id='nama' name='nama' autoFocus className="col-span-3 selection:text-white" />
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

export default EditNamaDialog