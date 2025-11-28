import Container from "@/globals/Container"
import InfoPinjaman from "@/components/pengguna/Perpanjangan Pengguna/InfoPinjaman"
import {LoadingKonfirmasiPerpanjangan, DataKonfirmasiPerpanjangan} from "@/components/pengguna/KonfirmasiPerpanjangan/index"
import useFetchConfirmPerpanjanganUser from "@/hooks/fetchHooks/penggunaHooks/perpanjangan/useFetchConfirmPerpanjanganUser"

const ConfirmPerpanjangan = () => {
    const { isLoading, peminjaman, perpanjangan } = useFetchConfirmPerpanjanganUser()
    if (isLoading) return <LoadingKonfirmasiPerpanjangan />

    return (
        <Container className="w-4/5 my-10 flex gap-x-6">
            <section className="w-2/3 flex flex-col">
                <InfoPinjaman peminjaman={peminjaman} perpanjangan={perpanjangan} />
            </section>
            <DataKonfirmasiPerpanjangan perpanjangan={perpanjangan} peminjaman={peminjaman} />
        </Container>
    )
}

export default ConfirmPerpanjangan