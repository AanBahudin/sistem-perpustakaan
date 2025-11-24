import { getProfilePustakawan } from "@/actions/Pustakawan/Profil/pustakawanProfileActions"
import PustakawanBreadCrumbs from "@/components/Pustakawan/PustakawanBreadCrumbs"
import Container from "@/globals/Container"
import { useQuery } from "@tanstack/react-query"
import PustakawanMainProfileContainer from "@/components/Pustakawan/Profil/PustakawanMainProfileContainer"
import PustakawanLoading from "@/components/Pustakawan/Profil/PustakawanLoading"

const PustakawanProfilePage = () => {

  const {isLoading, data} = useQuery({
    queryKey: ['pustakawan', 'profil'],
    queryFn: getProfilePustakawan
  })

  if (isLoading) return <PustakawanLoading />

  return (
    <Container className="w-full ">
      <PustakawanBreadCrumbs />
      <PustakawanMainProfileContainer data={data} />

    </Container>
  )
}

export default PustakawanProfilePage