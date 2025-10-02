import { getAllSimpanan } from "@/actions/simpanActions"
import Container from "@/globals/Container"
import SimpananBooks from "./SimpananBooks"
import SukaLoading from "@/components/Loading/SukaLoading"
import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"


const SimpanPage = () => {

  const {data: dataSimpanan, isLoading} = useQuery({
    queryKey: ['simpan'],
    queryFn: getAllSimpanan
  })

  return (
    <Container className="my-20 min-h-[110vh]">
      {/* <SimpanSearch /> */}
      <section className="w-full border rounded-2xl p-6 shadow-lg shadow-muted">
        <h1 className="text-3xl font-semibold">Hallo Aan Bahudin🙌</h1>
        <p className="text-muted-foreground">Di sini kamu bisa melihat semua buku yang pernah kamu beri tanda simpan. Cocok buat dibaca lagi nanti!</p>
        
        <Button className="mt-4 w-40 text-white">
          <Link to='/my/buku'>Lihat buku lain</Link>
        </Button>
      </section>

      {isLoading ? <SukaLoading /> : <SimpananBooks books={dataSimpanan.bukuDisimpan} />}

    </Container>
  )
}

export default SimpanPage