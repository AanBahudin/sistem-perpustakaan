import ToggleLayout from "@/components/pengguna/peminjamanPengguna/ToggleLayout"
import Container from "@/globals/Container"

const PeminjamanPage = () => {
  return (
    <Container className="my-20">
      <section className="flex items-center justify-between">
        <h1 className="text-2xl text-muted-foreground font-semibold">Peminjaman</h1>

        <ToggleLayout />
      </section>

      <section className="w-full grid grid-cols-12 mt-10">
        <main className="col-span-3">filter</main>
        <main className="col-span-9">buku</main>
      </section>
    </Container>
  )
}

export default PeminjamanPage 