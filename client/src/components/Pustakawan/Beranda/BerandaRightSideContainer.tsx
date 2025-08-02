import { Calendar } from "@/components/ui/calendar"
import PustakawanUserDataContainer from "./PustakawanUserDataContainer"

const BerandaRightSideContainer = ({data} : {data: any}) => {
    return (
        <main className='flex-1 h-fit flex flex-col items-center'>
            <div className="w-full flex gap-x-2 min-h-fit">
            <Calendar className="border rounded-xl"/>

            <div className="flex-1 bg-primary/30 p-6 rounded-xl flex items-center justify-center flex-col">
                <h1 className="text-center text-2xl font-bold">Cek Jadwal Pengembalian Buku🔥🚀</h1>
            </div>

            </div>
        <PustakawanUserDataContainer data={data} />
      </main>
    )
}

export default BerandaRightSideContainer