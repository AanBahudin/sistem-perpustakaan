import PustakawanBerandaWelcomeSign from "@/components/Pustakawan/Beranda/PustakawanBerandaWelcomeSign"
import SummaryCards from "@/components/Pustakawan/Beranda/SummaryCards"
import { Calendar } from "@/components/ui/calendar"
import RiwayatBukuTable from "@/components/Pustakawan/Beranda/RiwayatBukuTable"
import PustakawanUserDataContainer from "@/components/Pustakawan/Beranda/PustakawanUserDataContainer"

const PustakawanBerandaPage = () => {
  return (
    <section className='w-full min-h-[100vhs] flex gap-x-6'>
      <main className='w-[60%] flex flex-col items-start'>
        {/* WELCOME SIGN */}
        <PustakawanBerandaWelcomeSign />
        <SummaryCards />
        <RiwayatBukuTable />        
      </main>

      <main className='flex-1 h-fit flex flex-col items-center'>
        <div className="w-full flex gap-x-2 min-h-fit">
          <Calendar className="border rounded-xl"/>
          <div className="flex-1 bg-primary/30 p-6 rounded-xl flex items-center justify-center flex-col">

          </div>

        </div>
        <PustakawanUserDataContainer />
      </main>
    </section>
  )
}

export default PustakawanBerandaPage