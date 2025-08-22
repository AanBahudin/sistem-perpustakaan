
import { LucideIcon } from "lucide-react"
import { Link } from "react-router-dom"


const SummaryCard = ({id, total, Icon} : {id: number, total: number | 0, Icon: LucideIcon}) => {

    const titles = ['Dipinjam', 'Diperpanjang', 'Dikembalikan', 'Dihilangkan']
    

    return (
        <section className="col-span-1 rounded-xl min-h-[13vh] bg-transparent border py-2 px-6 flex items-center justify-between">
            <main className="flex items-center gap-x-6">
                <h1 className="text-5xl font-bold">{total}</h1>
                <div className="flex flex-col">
                    <p className="text-sm font-bold">Total Buku <br /> {titles[id]}</p>
                    <Link to='pengajuan' className="text-xs hover:underline duration-200 ease-in-out cursor-pointer text-muted-foreground mt-2">lihat detail</Link>
                </div>
            </main>

            <main className="w-14 h-14 bg-primary/20 rounded-full flex items-center justify-center">
                <Icon className="stroke-primary" />    
            </main>
        </section>
  )
}

export default SummaryCard