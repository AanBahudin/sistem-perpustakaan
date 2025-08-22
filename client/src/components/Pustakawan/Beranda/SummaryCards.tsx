import { Link } from "react-router-dom"
import SummaryCard from "./SummaryCard"
import { BookDashed, FileCheck2, FilePlus, FileSymlink, LucideIcon } from "lucide-react"

const SummaryCards = ({data} : {data: any}) => {

    const {peminjaman, pengembalian, perpanjangan, bukuHilang} = data
    const cardsData = [peminjaman, perpanjangan, pengembalian, bukuHilang]

    const icons : Array<LucideIcon> = [FileCheck2, FilePlus, FileSymlink, BookDashed]

    return (
        <section className='w-full my-8'>
            <main className='flex items-center justify-between'>
                <h3 className="text-xl font-bold">Tinjau Pengajuan</h3>
                <Link to='/pustakawan/pengajuan' className="text-xs hover:underline duration-200 ease-in-out cursor-default">Lihat semua</Link>
            </main>

            <main className="grid grid-cols-2 gap-x-4 gap-y-2 mt-4">
                {Array.from({length: 4}).map((_, index: number) => {
                    return <SummaryCard key={index} id={index} total={cardsData[index].length} Icon={icons[index]} />
                })}
            </main>
        </section>
    )
}

export default SummaryCards