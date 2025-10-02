import { prodiCreatePustakawan } from "@/actions/Prodi/ProdiPenggunaActions"
import TambahPenggunaInput from "@/components/Prodi/Pengguna/TambahPenggunaInput"
import TambahPenggunaNomorHpInput from "@/components/Prodi/Pengguna/TambahPenggunaNomorHpInput"
import { Button } from "@/components/ui/button"
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
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Loader, PlusCircle } from "lucide-react"
import { useState } from "react"
import { useSearchParams } from "react-router-dom"
import { toast } from "sonner"

const TambahPustakawanDialog = () => {

    const [openDialog, setOpenDialog] = useState(false)
    const handleOpenDialog = (value: boolean) => {
        setOpenDialog(value)
    }

    const [searchParams] = useSearchParams()
    const params = new URLSearchParams(searchParams)

    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: (data: any) => prodiCreatePustakawan(data),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['semua', 'pustakawan', params]})
            toast('Pustakawan Ditambahkan!', {description: 'Pustakawan berhasil didaftarkan'})
            handleOpenDialog(false)
        },
        onError: (error: any) => {
            const errMsg = error.response.data.message || 'Gagal menambahakan pustakawan, Coba lagi nanti'
            toast('Terjadi kesalahan', {description: errMsg})
        }
    })

    const handleSubmit = (e: any) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const data = Object.fromEntries(formData)

        mutation.mutate(data)
    }

    const isLoading = mutation.isPending

    return (
        <Dialog open={openDialog} onOpenChange={handleOpenDialog}>
            <DialogTrigger asChild>
                <Button className='text-xs mb-4 flex items-center justify-center gap-x-2 hover:bg-primary/70 ease-in-out duration-200'>
                    <PlusCircle />
                    <p>Pustakawan Baru</p>
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[6   00px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Tambah Pustakawan Baru</DialogTitle>
                        <DialogDescription className="text-xs">
                        Silakan lengkapi data pustakawan baru yang akan ditambahkan ke dalam sistem perpustakaan. Pastikan informasi yang dimasukkan sesuai agar akun dapat digunakan dengan baik.
                        </DialogDescription>
                    </DialogHeader>

                    <section className="my-6 flex flex-col gap-y-3 !text-xs">
                        <main className="w-full flex gap-x-2 items-center justify-center">
                            <TambahPenggunaInput label="Nama Lengkap" name="nama" placeholder="Nama lengkap pustakawan" autofocus />
                            <TambahPenggunaInput label="E-mail" name="email" placeholder="pustakawana@gmail.com" type="email" />
                        </main>

                        <main className="w-full flex gap-x-2 items-center justify-center">
                            <TambahPenggunaNomorHpInput />
                        </main>

                    </section>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button disabled={isLoading} variant="outline" className="text-xs">Batal</Button>
                        </DialogClose>
                        <Button type="submit" disabled={isLoading} className="text-xs flex items-center justify-center gap-x-2">
                            {isLoading && <Loader className="animate-spin" />}
                            <p>{isLoading ? 'Menambahkan' : 'Tambah Pustakawan'}</p>
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default TambahPustakawanDialog