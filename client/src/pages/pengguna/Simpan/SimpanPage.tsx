import Container from "@/globals/Container"
import SimpananBooks from "./SimpananBooks"
import SukaLoading from "@/components/Loading/SukaLoading"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import useGetAllBukuPenggunaDisimpan from "@/hooks/fetchHooks/penggunaHooks/simpanHooks/useGetAllBukuPenggunaDisimpan"

const SimpanPage = () => {
  
  const { isLoading, dataProfil, dataBukuDisimpan } = useGetAllBukuPenggunaDisimpan()

  return (
    <Container className="my-20 min-h-[110vh]">
      {/* <SimpanSearch /> */}
      <section className="w-full border rounded-2xl p-6 shadow-lg shadow-muted">
        <h1 className="text-3xl font-semibold">Hallo {dataProfil?.nama}🙌</h1>
        <p className="text-muted-foreground">Di sini kamu bisa melihat semua buku yang pernah kamu beri tanda simpan. Cocok buat dibaca lagi nanti!</p>
        
        <Button className="mt-4 w-40 text-white">
          <Link to='/my/buku'>Lihat buku lain</Link>
        </Button>
      </section>

      {isLoading ? <SukaLoading /> : <SimpananBooks books={dataBukuDisimpan.bukuDisimpan} />}

    </Container>
  )
}

export default SimpanPage