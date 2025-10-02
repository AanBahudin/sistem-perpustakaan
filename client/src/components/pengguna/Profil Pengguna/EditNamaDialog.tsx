import { updateProfileAction } from "@/actions/userActions"
import { errorMsgGenerator } from "@/utils/errorMsgFunc"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
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
import { useState } from "react"


const EditNamaDialog = ({data} : {data: any}) => {


    const [open, setOpen] = useState(false)
    const handleOpen = (value: boolean) => {
        setOpen(value)
    }

    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: (data: FormData) => updateProfileAction(data),
        onSuccess: () => {
            toast('Diperbaharui', {description: 'Nama lengkap berhasil diperbaharui'})
            queryClient.invalidateQueries({queryKey: ['pengguna', 'profil']})
            handleOpen(false)
        },
        onError: (error: any) => {
            const errMsg = errorMsgGenerator(error)
            toast('Gagal memperbaharui nama', {description: errMsg})
            handleOpen(false)
        }
    })

    const handleSubmit = (e: any) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        mutation.mutate(formData)
    }

    const isLoading = mutation.isPending

    
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
                        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
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