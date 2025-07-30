import { Link } from "react-router-dom"

const SummaryCards = () => {

    const titles = ['Dipinjam', 'Diperpanjang', 'Dikembalikan', 'Dihilangkan']

    return (
        <section className='w-full my-8'>
            <main className='flex items-center justify-between'>
                <h3 className="text-xl font-bold">Tinjau Pengajuan</h3>
                <Link to='/pustakawan/pengajuan' className="text-xs hover:underline duration-200 ease-in-out cursor-default">Lihat semua</Link>
            </main>

            <main className="grid grid-cols-2 gap-x-4 gap-y-2 mt-4">
                {Array.from({length: 4}).map((_, index: number) => {
                    return (
                    <div key={index} className="col-span-1 rounded-xl border min-h-[13vh] bg-accent py-2 px-6 flex items-center justify-between">
                        <div className="flex items-center gap-x-6">
                            <h1 className="text-5xl font-bold">7</h1>
                            <div className="flex flex-col">
                                <p className="text-sm font-bold">Total Buku <br /> {titles[index]}</p>
                                <p className="text-xs underline text-muted-foreground mt-2">lihat detail</p>
                            </div>
                        </div>

                        <div className="w-18 h-18 rounded-full bg-accent-foreground"></div>
                    </div>
                    )
                })}
            </main>
        </section>
    )
}

export default SummaryCards