import { useQuery } from "@tanstack/react-query"
import Logo from "../../landing/Navbar/Logo"
import { Link } from "react-router-dom"
import { getProfilePustakawan } from "@/actions/Pustakawan/pustakawanProfileActions"
import { Skeleton } from "@/components/ui/skeleton"

const PustakawanSidebarHeader = () => {

  const {data, isLoading} = useQuery({
    queryKey: ['profil'],
    queryFn: getProfilePustakawan
  })

  return (
    <section className='w-full flex items-start gap-x-5'>
        <Logo />
        {isLoading ? (
          <SidebarHeaderLoading />
        ) : (
          <div className='flex-1'>
            <Link to='/pustakawan/profil' className='text-sm font-bold ch3apitalize hover:underline cursor-pointer duration-300 ease-in-out'>{data.nama}</Link>
            <h3 className='text-muted-foreground text-xs truncate'>{data.email}</h3>
          </div>
        )}
    </section>
  )
}

export default PustakawanSidebarHeader

const SidebarHeaderLoading = () => {
  return (
    <div className="flex-1">
      <Skeleton className="w-[80px] h-8" />
      <Skeleton className="w-[40px] h-6" />
    </div>
  )
}