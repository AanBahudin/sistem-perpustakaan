import { Calendar } from "@/components/ui/calendar"
import PustakawanUserDataContainer from "@/components/Pustakawan/Beranda/PustakawanUserDataContainer"
import { useQuery } from "@tanstack/react-query"
import { getStatsPustakawan } from "@/actions/Pustakawan/pustakawanStatsAction"
import BerandaLeftSideContainer from "@/components/Pustakawan/Beranda/BerandaLeftSideContainer"
import BerandaRightSideContainer from "@/components/Pustakawan/Beranda/BerandaRightSideContainer"

const PustakawanBerandaPage = () => {

  const {data, isLoading} = useQuery({
    queryKey: ['pustakawan', 'beranda'],
    queryFn: getStatsPustakawan
  })

  if (isLoading) return <h1>Loading...</h1>

  return (
    <section className='w-full min-h-[100vhs] flex gap-x-6'>
      <BerandaLeftSideContainer data={data}/>
      <BerandaRightSideContainer data={data} />   
    </section>
  )
}

export default PustakawanBerandaPage