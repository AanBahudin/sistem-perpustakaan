import { getAllSuka } from "@/actions/sukaActions"
import SukaLoading from "@/components/Loading/SukaLoading"
import Books from "@/components/pengguna/Suka/Books"
import { Button } from "@/components/ui/button"
import Container from "@/globals/Container"
import { useQueries } from "@tanstack/react-query"
import { profileAction } from "@/actions/userActions"
import { Link } from "react-router-dom"

const SukaPage = () => {

    const datas = useQueries({
    queries: [
      {
        queryKey: ['suka'],
        queryFn: getAllSuka
      },
      {
        queryKey: ['pengguna', 'profil'],
        queryFn: profileAction
      }
    ]
  })

  const [dataSimpanan, profil] = datas
  const isLoading = datas.some(q => q.isLoading)

  const { data: dataBukuDisukai } = dataSimpanan
  const { data: dataProfil } = profil
   
    return (
        <Container className="my-20">
            <section className="w-full border rounded-2xl p-6 shadow-lg shadow-muted">
                <h1 className="text-3xl font-semibold">Hallo {dataProfil?.nama}🙌</h1>
                <p className="text-muted-foreground">Di sini kamu bisa melihat semua buku yang pernah kamu beri tanda suka. Cocok buat dibaca lagi nanti!</p>
                <Button className="mt-4 w-40 text-white">
                    <Link to='/my/buku'>Lihat buku lain</Link>
                </Button>
            </section>
            {isLoading ? <SukaLoading /> : <Books books={dataBukuDisukai.bukuDisukai} />}
            
        </Container>
    )
}

export default SukaPage