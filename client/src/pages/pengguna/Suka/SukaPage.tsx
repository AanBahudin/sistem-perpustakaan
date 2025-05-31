import { getAllSimpanan } from "@/actions/simpanActions"
import { getAllSuka } from "@/actions/sukaActions"
import SukaLoading from "@/components/Loading/SukaLoading"
import Books from "@/components/pengguna/Suka/Books"
import Container from "@/globals/Container"
import { useQueries } from "@tanstack/react-query"

const SukaPage = () => {
    const results = useQueries({
        queries: [
            {
                queryKey: ['suka'],
                queryFn: getAllSuka
            },
            {
                queryKey: ['simpan'],
                queryFn: getAllSimpanan
            }
        ]
    })

    const [disukai] = results
    const isLoading = results.some(q => q.isLoading)

    if (isLoading) return <SukaLoading />

    return (
        <Container className="my-20">
            <Books books={disukai.data.bukuDisukai} />
        </Container>
    )
}

export default SukaPage