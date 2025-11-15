
import Container from "@/globals/Container"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Edit } from "lucide-react"
import PengaturanSectionLoading from "./PengaturanSectionLoading"
import useFetchMaksimalPeminjamanPengguna from "@/hooks/fetchHooks/pustakawanHooks/pengaturanHooks/useFetchMaksimalPeminjamanPengguna"
import PengaturanMaksimalPeminjamanDialog from "./PengaturanMaksimalPeminjamanDialog"

const PengaturanMaksPeminjaman = () => {

    const { data, isLoading } = useFetchMaksimalPeminjamanPengguna()
    if (isLoading) return <PengaturanSectionLoading />

    return (
        <Container className='w-full my-6 min-h-[80vh]'>
        <h1 className='text-3xl font-bold mt-10'>Ketentuan Maksimal Peminjaman Buku</h1>
        <h5 className='mt-3 text-sm text-muted-foreground w-[80%]'>Setiap pengguna memiliki batas maksimal jumlah buku yang dapat dipinjam secara bersamaan. Ketentuan ini diberlakukan untuk memastikan ketersediaan koleksi perpustakaan bagi seluruh pengguna. Pastikan jumlah buku yang Anda pinjam tidak melebihi batas yang ditetapkan agar proses peminjaman dapat dilakukan tanpa kendala.</h5>

        <section className='w-full flex items-center justify-between my-10'>
            <Label className='capitalize text-md text-muted-foreground'>Jumlah Peminjaman Maksimal</Label>
            <main className='w-fit flex items-center justify-center gap-x-4'>
            <p className="border w-[300px] h-9  rounded-lg bg-accent/40 flex items-center px-4 text-sm font-semibold text-muted-foreground">{data.maksimal} Peminjaman</p>

            <PengaturanMaksimalPeminjamanDialog dataMaks={data}>
                <Button size='sm' className="hover:bg-primary/70 duration-200 ease-in-out"><Edit /></Button>
            </PengaturanMaksimalPeminjamanDialog>
            </main>
        </section>
        </Container>
    )
}

export default PengaturanMaksPeminjaman