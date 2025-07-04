import { getDetailPeminjaman } from "@/actions/peminjamanActions"
import { getSinglePerpanjanganByPeminjamanId } from "@/actions/perpanjanganActions"
import Container from "@/globals/Container"
import { useQueries } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import InfoPinjaman from "./InfoPinjaman"
import KonfirmasiDataPerpanjangan from "./KonfirmasiDataPerpanjangan"

const ConfirmPerpanjangan = () => {

    const {id} = useParams()
    const results = useQueries({
        queries: [
            {
                queryKey: ['peminjaman', id],
                queryFn: () => getDetailPeminjaman(id as string)
            },
            {
                queryKey: ['perpanjangan', 'peminjamnan', id],
                queryFn: () =>  getSinglePerpanjanganByPeminjamanId(id as string)
            }
        ]
    })


    const [peminjaman, perpanjangan] = results
    const isLoading = results.some(q => q.isLoading)
    if (isLoading) return <h1>Loading...</h1>

    return (
        <Container className="w-4/5 my-10 flex gap-x-6">
            <section className="w-2/3 flex flex-col">
                <InfoPinjaman peminjaman={peminjaman.data} perpanjangan={perpanjangan.data} />
            </section>
            <KonfirmasiDataPerpanjangan perpanjangan={perpanjangan.data} peminjaman={peminjaman.data} />
        </Container>
    )
}

export default ConfirmPerpanjangan