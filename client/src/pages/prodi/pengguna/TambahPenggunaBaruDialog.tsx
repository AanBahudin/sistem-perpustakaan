import { prodiCreatePenggunaAction } from "@/actions/Prodi/Pengguna"
import TambahPenggunaAngkatanSelectInput from "@/components/Prodi/Pengguna/TambahPenggunaAngkatanSelectInput"
import TambahPenggunaInput from "@/components/Prodi/Pengguna/TambahPenggunaInput"
import TambahPenggunaInputPassword from "@/components/Prodi/Pengguna/TambahPenggunaInputPassword"
import TambahPenggunaNomorHpInput from "@/components/Prodi/Pengguna/TambahPenggunaNomorHpInput"
import TambahPenggunaRoleSelectInput from "@/components/Prodi/Pengguna/TambahPenggunaRoleSelectInput"
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

const TambahPenggunaBaruDialog = () => {

    const [openDialog, setOpenDialog] = useState(false)
    const handleOpenDialog = (value: boolean) => {
        setOpenDialog(value)
    }

    const [searchParams] = useSearchParams()
    const params = new URLSearchParams(searchParams)

    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: (data: any) => prodiCreatePenggunaAction(data),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['semua', 'pengguna', params]})
            toast('Pengguna Ditambahkan!', {description: 'Pengguna berhasil ditambahkan'})
            handleOpenDialog(false)
        },
        onError: (error: any) => {
            const errMsg = error.response.data.message || 'Gagal menambahakan pengguna, Coba lagi nanti'
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
                    <p>Pengguna Baru</p>
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[700px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Tambah Pengguna Baru</DialogTitle>
                        <DialogDescription className="text-xs">
                        Silakan lengkapi data pengguna baru yang akan ditambahkan ke dalam sistem perpustakaan. Pastikan informasi yang dimasukkan sesuai agar akun dapat digunakan dengan baik.
                        </DialogDescription>
                    </DialogHeader>

                    <section className="my-6 flex flex-col gap-y-3 !text-xs">
                        <main className="w-full flex gap-x-2 items-center justify-center">
                            <TambahPenggunaInput label="Nama Lengkap" name="nama" placeholder="Nama lengkap pengguna" autofocus />
                            <TambahPenggunaInput label="NIM atau NIDN" name="idKampus" placeholder="21761398" />
                        </main>

                        <main className="w-full flex gap-x-2 items-center justify-center">
                            <TambahPenggunaInput label="Jurusan" name="jurusan" readonly defaultValue="Teknik Informatika" />
                            <TambahPenggunaAngkatanSelectInput />
                        </main>
                    
                        <main className="w-full flex gap-x-2 items-center justify-center">
                            <TambahPenggunaInput label="Email Aktif" name="email" placeholder="Email aktif pengguna" type="email" />
                            <TambahPenggunaNomorHpInput />
                        </main>

                        <TambahPenggunaInputPassword />
                        <TambahPenggunaRoleSelectInput />
                    </section>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button disabled={isLoading} variant="outline" className="text-xs">Batal</Button>
                        </DialogClose>
                        <Button type="submit" disabled={isLoading} className="text-xs flex items-center justify-center gap-x-2">
                            {isLoading && <Loader className="animate-spin" />}
                            <p>{isLoading ? 'Menambahkan' : 'Tambah Pengguna'}</p>
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default TambahPenggunaBaruDialog