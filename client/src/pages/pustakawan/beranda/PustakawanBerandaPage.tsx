import { useQuery } from "@tanstack/react-query"
import { getStatsPustakawan } from "@/actions/Pustakawan/pustakawanStatsAction"
import BerandaLeftSideContainer from "@/components/Pustakawan/Beranda/BerandaLeftSideContainer"
import BerandaRightSideContainer from "@/components/Pustakawan/Beranda/BerandaRightSideContainer"
import BerandaLoading from "@/components/Pustakawan/Beranda/BerandaLoading"

const PustakawanBerandaPage = () => {

  const {data, isLoading} = useQuery({
    queryKey: ['pustakawan', 'beranda'],
    queryFn: getStatsPustakawan
  })

  if (isLoading) return <BerandaLoading />

  return (
    <section className='w-full min-h-[100vh] flex gap-x-6'>
      <BerandaLeftSideContainer data={data}/>
      <BerandaRightSideContainer data={data} />   
    </section>
  )
}

export default PustakawanBerandaPage