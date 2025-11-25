import { usePustakawanBeranda } from "@/hooks/fetchHooks/pustakawanHooks/berandaHooks"
import BerandaLeftSideContainer from "@/components/Pustakawan/Beranda/BerandaLeftSideContainer"
import BerandaRightSideContainer from "@/components/Pustakawan/Beranda/BerandaRightSideContainer"
import BerandaLoading from "@/components/Pustakawan/Beranda/BerandaLoading"

const PustakawanBerandaPage = () => {

  const {data, isLoading} = usePustakawanBeranda()

  if (isLoading) return <BerandaLoading />

  return (
    <section className='w-full min-h-[100vh] flex gap-x-6'>
      <BerandaLeftSideContainer data={data}/>
      <BerandaRightSideContainer data={data} />   
    </section>
  )
}

export default PustakawanBerandaPage