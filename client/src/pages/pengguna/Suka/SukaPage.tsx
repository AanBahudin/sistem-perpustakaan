import { getAllSuka } from "@/actions/sukaActions"
import SukaLoading from "@/components/Loading/SukaLoading"
import Books from "@/components/pengguna/Suka/Books"
import { Button } from "@/components/ui/button"
import Container from "@/globals/Container"
import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router-dom"

const SukaPage = () => {
    const {data:disukai, isLoading} = useQuery({
        queryKey: ['suka'],
        queryFn: getAllSuka
    })
   
    return (
        <Container className="my-20">
            <section className="w-full border rounded-2xl p-6 shadow-lg shadow-muted">
                <h1 className="text-3xl font-semibold">Hallo Aan Bahudin🙌</h1>
                <p className="text-muted-foreground">Di sini kamu bisa melihat semua buku yang pernah kamu beri tanda suka. Cocok buat dibaca lagi nanti!</p>
                <Button className="mt-4 w-40 text-white">
                    <Link to='/my/buku'>Lihat buku lain</Link>
                </Button>
            </section>
            {isLoading ? <SukaLoading /> : <Books books={disukai.bukuDisukai} />}
            
        </Container>
    )
}

export default SukaPage