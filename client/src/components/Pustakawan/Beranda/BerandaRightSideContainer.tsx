import { Calendar } from "@/components/ui/calendar"
import PustakawanUserDataContainer from "./PustakawanUserDataContainer"

const BerandaRightSideContainer = ({data} : {data: any}) => {

    const { peminjaman } = data
    const dates = peminjaman.filter((item: any) => {
        return item.statusPeminjaman === 'Dipinjam' || item.statusPeminjaman === 'Terlambat'
    }).map((item: any) => {
        return new Date(item.berakhirPada)
    })

    return (
        <section className='flex-1 h-fit flex flex-col items-center'>
            <main className="w-full flex gap-x-2 min-h-fit">

                <Calendar 
                    mode="single"
                    modifiers={{
                        marked: dates, // kita bikin modifier khusus
                    }}
                    modifiersClassNames={{
                        marked: "bg-destructive text-white rounded-full", // style untuk tanggal yg ditandai
                    }}
                    className="border rounded-xl"/>

                <div className="flex-1 bg-primary/30 p-6 rounded-xl flex items-center justify-center flex-col">
                    <h1 className="text-center text-2xl font-bold">Cek Jadwal Pengembalian Buku🔥🚀</h1>
                </div>
            </main>
        <PustakawanUserDataContainer data={data} />
      </section>
    )
}

export default BerandaRightSideContainer