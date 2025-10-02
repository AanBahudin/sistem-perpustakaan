import { useQuery } from "@tanstack/react-query"
import { getDenda } from "@/actions/GlobalActions/DendaActions"
import Container from "@/globals/Container"
import { Label } from "@/components/ui/label"
import { formatRupiah } from "@/utils/formatCurrency"
import { Button } from "@/components/ui/button"
import { Edit } from "lucide-react"
import PengaturanEditDendaDialog from "./PengaturanEditDendaDialog"

const PustakawanDendaSection = () => {

  const {data, isLoading} = useQuery({
    queryKey: ['denda'],
    queryFn: getDenda
  })

  if (isLoading) return <h1>Loading...</h1>

  return (
    <Container className='w-full my-6 min-h-[80vh]'>
      <h1 className='text-3xl font-bold mt-10'>Ketentuan Denda Peminjaman Buku</h1>
      <h5 className='mt-3 text-sm text-muted-foreground w-[80%]'>Denda diberlakukan sebagai bentuk tanggung jawab pengguna dalam menjaga koleksi perpustakaan. Besaran denda ditentukan berdasarkan keterlambatan pengembalian. Pastikan buku dikembalikan tepat waktu dan dalam keadaan baik untuk menghindari biaya tambahan.</h5>

      <section className='w-full flex items-center justify-between my-10'>
        <Label className='capitalize text-md text-muted-foreground'>Nominal denda keterlambatan</Label>
        <main className='w-fit flex items-center justify-center gap-x-4'>
          <p className="border w-[300px] h-9  rounded-lg bg-accent/40 flex items-center px-4 text-sm font-semibold text-muted-foreground">{formatRupiah(data.denda)}</p>

          <PengaturanEditDendaDialog dataDenda={data}>
            <Button size='sm' className="hover:bg-primary/70 duration-200 ease-in-out"><Edit /></Button>
          </PengaturanEditDendaDialog>
        </main>
      </section>
    </Container>
  )
}

export default PustakawanDendaSection