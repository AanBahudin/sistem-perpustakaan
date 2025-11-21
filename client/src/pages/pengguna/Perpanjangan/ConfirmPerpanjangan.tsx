import Container from "@/globals/Container"
import InfoPinjaman from "./InfoPinjaman"
import KonfirmasiDataPerpanjangan from "./KonfirmasiDataPerpanjangan"
import ConfirmPerpanjanganLoading from "./ConfirmPerpanjanganLoading"
import useFetchConfirmPerpanjanganUser from "@/hooks/fetchHooks/penggunaHooks/perpanjangan/useFetchConfirmPerpanjanganUser"

const ConfirmPerpanjangan = () => {
    const { isLoading, peminjaman, perpanjangan } = useFetchConfirmPerpanjanganUser()
    if (isLoading) return <ConfirmPerpanjanganLoading />

    return (
        <Container className="w-4/5 my-10 flex gap-x-6">
            <section className="w-2/3 flex flex-col">
                <InfoPinjaman peminjaman={peminjaman} perpanjangan={perpanjangan} />
            </section>
            <KonfirmasiDataPerpanjangan perpanjangan={perpanjangan} peminjaman={peminjaman} />
        </Container>
    )
}

export default ConfirmPerpanjangan