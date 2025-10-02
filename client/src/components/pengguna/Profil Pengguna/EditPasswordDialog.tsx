import { updatePasswordAction } from "@/actions/userActions"
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
import { Pencil, Eye } from "lucide-react"
import { useState } from "react"

const EditPasswordDialog = () => {


    const [open, setOpen] = useState(false)
    const handleOpen = (value: boolean) => {
        setOpen(value)
    }

    const [showPass, setShowPass] = useState<boolean>(false)
    const [confirmPass, setShowConfirmPass] = useState<boolean>(false)


    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: (data: FormData) => updatePasswordAction(data),
        onSuccess: () => {
            toast('Diperbaharui', {description: 'Kata sandi berhasil diperbaharui'})
            queryClient.invalidateQueries({queryKey: ['pengguna', 'profil']})
            handleOpen(false)
        },
        onError: (error: any) => {
            const errMsg = errorMsgGenerator(error)
            toast('Gagal memperbaharui kata sandi', {description: errMsg})
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
            <Label className='font-normal'>Kata Sandi</Label>
            
            <main className='flex w-full gap-x-2 items-center justify-center'>
                <Input value='*****************' readOnly={true} className='mt-1 text-muted-foreground' />
                <Dialog onOpenChange={handleOpen} open={open}>
                    <DialogTrigger asChild>
                        <Button variant='default' type="button"><Pencil className='stroke-primary-foreground dark:stroke-white' /></Button>
                    </DialogTrigger>

                    <DialogContent className="sm:max-w-[425px]">
                        <form onSubmit={handleSubmit} className="relative grid gap-4 py-4">
                            <DialogHeader>
                                <DialogTitle className="capitalize">Kata Sandi</DialogTitle>
                                <DialogDescription>Pastikan kata sandi anda kuat dan dapat di ingat</DialogDescription>
                            </DialogHeader>

                            <div className="flex flex-col items-start gap-4">
                                <Label htmlFor='oldPassword' className="text-right capitalize"> password Lama </Label>
                                <main className='col-span-3 w-full flex items-center justify-center gap-x-2'>
                                    <Input type={showPass ? 'text' : 'password'} required id='oldPassword' name='oldPassword' autoFocus className="w-full selection:text-white" />
                                    <Eye onClick={() => setShowPass(!showPass)} className={`w-fit h-full rounded py-1 px-2 duration-200 ease-in-out ${showPass ? 'stroke-primary-foreground dark:bg-transparent bg-primary' : 'stroke-primary  dark:stroke-white'}`} />
                                </main>

                                <Label htmlFor='newPassword' className="text-right capitalize"> Password Baru </Label>
                                <main className='col-span-3 w-full flex items-center justify-center gap-x-2'>
                                    <Input type={confirmPass ? 'text' : 'password'} required id='newPassword' name='newPassword' className="col-span  -3 selection:text-white" />
                                    <Eye onClick={() => setShowConfirmPass(!confirmPass)} className={`w-fit h-full rounded py-1 px-2 duration-200 ease-in-out ${confirmPass ? 'stroke-primary-foreground dark:bg-transparent bg-primary' : 'stroke-primary  dark:stroke-white'}`} />
                                </main>
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

export default EditPasswordDialog