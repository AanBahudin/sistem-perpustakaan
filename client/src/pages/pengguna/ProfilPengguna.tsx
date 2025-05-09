import ContentSection from "@/components/pengguna/ProfilPengguna/ContentSection"
import MenuSection from "@/components/pengguna/ProfilPengguna/MenuSection"
import ProfileCover from "@/components/pengguna/ProfilPengguna/ProfileCover"
import Container from "@/globals/Container"


const ProfilPengguna = () => {
  return (
    <Container className="mt-20 px-20 grid grid-cols-12 gap-x-4">
      <ProfileCover />
      <MenuSection />
      <ContentSection />
    </Container>
  )
}

export default ProfilPengguna