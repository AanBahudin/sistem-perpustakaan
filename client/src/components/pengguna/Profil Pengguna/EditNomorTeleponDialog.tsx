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


const EditNomorTeleponDialog = ({data} : {data: any}) => {


    const [open, setOpen] = useState(false)
    const handleOpen = (value: boolean) => {
        setOpen(value)
    }

    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: (data: FormData) => updateProfileAction(data),
        onSuccess: () => {
            toast('Diperbaharui', {description: 'Nomor Telepon berhasil diperbaharui'})
            queryClient.invalidateQueries({queryKey: ['pengguna', 'profil']})
            handleOpen(false)
        },
        onError: (error: any) => {
            const errMsg = errorMsgGenerator(error)
            toast('Gagal memperbaharui nomor telepon', {description: errMsg})
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
            <Label className='font-normal'>Nomor Telepon</Label>
            
            <main className='flex w-full gap-x-2 items-center justify-center'>
                <Input value={data.no_hp} readOnly={true} className='mt-1 text-muted-foreground' />
                <Dialog onOpenChange={handleOpen} open={open}>
                    <DialogTrigger asChild>
                        <Button variant='default' type="button"><Pencil className='stroke-primary-foreground dark:stroke-white' /></Button>
                    </DialogTrigger>

                    <DialogContent className="sm:max-w-[425px]">
                        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                            <DialogHeader>
                                <DialogTitle className="capitalize">Perbaharui Nomor Telepon</DialogTitle>
                                <DialogDescription>Pastikan kontak anda sesuai, aktif dan dapat dihubungi</DialogDescription>
                            </DialogHeader>

                            <div className="grid grid-cols-2 items-center gap-4">
                                <Label htmlFor='kontak' className="text-right capitalize">Nomor Telepon lama</Label>
                                <Input required id='no_hp' readOnly defaultValue={data?.no_hp || 'Belum ada'} className="col-span-3 selection:text-white" />
                                <Label htmlFor='kontak' className="text-right capitalize">Nomor Telepon baru</Label>
                                <Input required id='no_hp' autoFocus name='no_hp' type='text'  className="col-span-3 selection:text-white" />
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

export default EditNomorTeleponDialog