import Container from "@/globals/Container"
import PeminjamanInfo from "@/components/pengguna/KonfirmasiPeminjaman/PeminjamanInfo"
import KonfirmasiData from "@/components/pengguna/KonfirmasiPeminjaman/KonfirmasiData"
import FAQ from "@/components/pengguna/KonfirmasiPeminjaman/FAQ"
import useFetchKonfirmasiPeminjamanPengguna from "@/hooks/fetchHooks/penggunaHooks/peminjaman/useFetchKonfirmasiPeminjamanPengguna"

const KonfirmasiPeminjaman = () => {

  const { isLoading, profil, buku, peminjaman } = useFetchKonfirmasiPeminjamanPengguna()
  if (isLoading) return <h1>Loading...</h1>

  return (
    <Container className="w-[80%] my-10 flex gap-x-6">
      <section className="w-2/3 flex flex-col">
        <PeminjamanInfo detailBuku={buku} peminjaman={peminjaman} />
        <FAQ />
      </section>
      <KonfirmasiData dataBuku={buku} profil={profil} pinjaman={peminjaman} />
    </Container>
  )
}

export default KonfirmasiPeminjaman