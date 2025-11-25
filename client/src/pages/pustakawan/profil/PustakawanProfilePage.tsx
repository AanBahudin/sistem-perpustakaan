import PustakawanBreadCrumbs from "@/components/Pustakawan/PustakawanBreadCrumbs"
import Container from "@/globals/Container"
import PustakawanMainProfileContainer from "@/components/Pustakawan/Profil/PustakawanMainProfileContainer"
import PustakawanLoading from "@/components/Pustakawan/Profil/PustakawanLoading"
import { usePustakawanProfil } from "@/hooks/fetchHooks/pustakawanHooks/profilHooks"

const PustakawanProfilePage = () => {

  const {isLoading, data} = usePustakawanProfil()
  if (isLoading) return <PustakawanLoading />

  return (
    <Container className="w-full ">
      <PustakawanBreadCrumbs />
      <PustakawanMainProfileContainer data={data} />

    </Container>
  )
}

export default PustakawanProfilePage