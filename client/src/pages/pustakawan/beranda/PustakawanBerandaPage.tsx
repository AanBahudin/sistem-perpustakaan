import PustakawanBerandaWelcomeSign from "@/components/Pustakawan/Beranda/PustakawanBerandaWelcomeSign"
import { Calendar } from "@/components/ui/calendar"
import { Link } from "react-router-dom"

const PustakawanBerandaPage = () => {
  return (
    <section className='w-full flex gap-x-6'>
      <main className='w-[60%] flex flex-col items-start'>
        {/* WELCOME SIGN */}
        <PustakawanBerandaWelcomeSign />

        <section className='w-full my-8'>
          <main className='flex items-center justify-between'>
            <h3 className="text-xl font-bold">Tinjau Pengajuan</h3>
            <Link to='/pustakawan/pengajuan' className="text-xs hover:underline duration-200 ease-in-out cursor-default">Lihat semua</Link>
          </main>

          <main className="grid grid-cols-2 gap-x-4 gap-y-2 mt-4">
            {Array.from({length: 4}).map((_, index: number) => {
              return (
                <div key={index} className="col-span-1 rounded-xl border min-h-[15vh] bg-accent py-2 px-6 flex items-center justify-between">
                  <div className="flex items-center gap-x-6">
                    <h1 className="text-5xl font-bold">7</h1>
                    <div className="flex flex-col">
                      <p className="text-sm font-bold">Total Buku <br /> Dipinjam</p>
                      <p className="text-xs underline text-muted-foreground mt-4">lihat detail</p>
                    </div>
                  </div>

                  <div className="w-20 h-20 rounded-full bg-accent-foreground"></div>
                </div>
              )
            })}
          </main>
        </section>

        <section className="bg-primary/30 w-full rounded-2xl min-h-[40vh]">
        
        </section>
      </main>

      <main className='flex-1 h-fit flex flex-col items-center'>
        <div className="w-full flex gap-x-2 min-h-fit">
          <Calendar className="border rounded-xl"/>
          <div className="flex-1 bg-primary/30 p-6 rounded-xl">
            test
          </div>
        </div>
      </main>
    </section>
  )
}

export default PustakawanBerandaPage