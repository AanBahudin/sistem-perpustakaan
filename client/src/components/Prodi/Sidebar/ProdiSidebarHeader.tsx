import { useQuery } from "@tanstack/react-query"
import Logo from "../../landing/Navbar/Logo"
import { Link } from "react-router-dom"
import { Skeleton } from "@/components/ui/skeleton"
import { getProfilProdi } from "@/actions/Prodi/prodiActions"

const ProdiSidebarHeader = () => {

  const {data, isLoading} = useQuery({
    queryKey: ['profil'],
    queryFn: getProfilProdi
  })

  return (
    <section className='w-full flex items-start gap-x-5'>
      <Logo />
      {isLoading ? (
        <SidebarHeaderLoading />
      ) : (
        <div className='flex-1'>
          <Link to='/pustakawan/profil' className='text-sm font-bold ch3apitalize hover:underline cursor-pointer duration-300 ease-in-out'>{data?.nama.slice(0,20)}...</Link>
          <h3 className='text-muted-foreground text-xs truncate'>{data?.email}</h3>
        </div>
      )}
    </section>
  )
}

const SidebarHeaderLoading = () => {
  return (
    <div className="w-fit">
      <Skeleton className="w-[200px] h-4" />
      <Skeleton className="w-[150px] h-3 mt-2" />
    </div>
  )
}

export default ProdiSidebarHeader