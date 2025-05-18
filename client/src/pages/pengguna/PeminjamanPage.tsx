import ToggleLayout from "@/components/pengguna/peminjamanPengguna/ToggleLayout"
import Container from "@/globals/Container"
import { Input } from "@/components/ui/input"
import { useSelector } from "react-redux"
import PeminjamanSearch from "@/components/pengguna/peminjamanPengguna/PeminjamanSearch"
import PeminjamanTab from "@/components/pengguna/peminjamanPengguna/PeminjamanTab"
import PeminjamanDataLayout from "@/components/pengguna/peminjamanPengguna/PeminjamanDataLayout"


const PeminjamanPage = () => {

  const {layout} = useSelector((state:any) => state.peminjamanState)

  return (
    <Container className="my-20">
      <section className="flex items-center justify-between">
        <h1 className="text-2xl text-muted-foreground font-semibold">Peminjaman</h1>

        <ToggleLayout />
      </section>

      <section className="w-full grid grid-cols-12 mt-10">
        <main className="col-span-3 pr-6">
          <div className='flex flex-col gap-y-4'>
            <Input type='number' placeholder='ISBN' />
            <Input type='text' placeholder='Penulis' />
            <Input type='text' placeholder='Penerbit' />
            <Input type='number' placeholder='Tahun Terbit' />
          </div>
        </main>

        <main className="col-span-9">
          <PeminjamanTab />
          <PeminjamanSearch />
          <PeminjamanDataLayout layout={layout} />
        </main>
      </section>
    </Container>
  )
}

export default PeminjamanPage 