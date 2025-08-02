import PustakawanBerandaWelcomeSign from "./PustakawanBerandaWelcomeSign"
import SummaryCards from "./SummaryCards"
import RiwayatBukuTable from "./RiwayatBukuTable"


const BerandaLeftSideContainer = ({data} : {data: any}) => {
  return (
    <section className='w-[60%] flex flex-col items-start'>
        {/* WELCOME SIGN */}
        <PustakawanBerandaWelcomeSign />
        <SummaryCards data={data} />
        <RiwayatBukuTable data={data} />        
    </section>
  )
}

export default BerandaLeftSideContainer