
import Container from "@/globals/Container"
import { Outlet } from "react-router-dom"
import ToggleLayout from "@/components/pengguna/peminjaman Pengguna/ToggleLayout"
import ProfilContainer from "@/components/pengguna/peminjaman Pengguna/ProfilContainer"
import MenuContainer from "@/components/pengguna/peminjaman Pengguna/MenuContainer"


const DataPenggunaLayout = () => {
  return (
    <Container className="my-20">
      <section className="flex items-center justify-end">
        <ToggleLayout />
      </section>

      <section className="w-full grid grid-cols-12 mt-10">
        <main className="col-span-2 pr-6 border-r">
          <ProfilContainer />
          <MenuContainer />
        </main>

        <main className="col-span-10 pl-10">
          <Outlet />
        </main>
      </section>
    </Container>
  )
}

export default DataPenggunaLayout