import { ProfilPageMenuSection, ProfileCover } from "@/components/pengguna/ProfilPengguna"
import Container from "@/globals/Container"
import { Outlet } from "react-router-dom"

const ProfilPengguna = () => {
  return (
    <Container className="mt-20 px-20 grid grid-cols-12 gap-x-4">
      <ProfileCover />
      <ProfilPageMenuSection />
      <section className="col-span-9">
        <Outlet />
      </section>
    </Container>
  )
}

export default ProfilPengguna