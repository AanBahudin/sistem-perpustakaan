import PustakawanGraphStats from "./PustakawanGraphStats"
import { BookCopy, FileCheck2, FilePlus, FileSymlink } from "lucide-react"

const PustakawanGraphStatsContainer = ({data} : {data: any}) => {

  const { statsBuku, statsPeminjaman, statsPerpanjangan, statusPengembalian } = data

  return (
    <section className="w-full my-4 flex flex-col gap-y-4">
      <PustakawanGraphStats data={statsBuku} title='Grafik Pengelolaan Buku' Icon={BookCopy} />
      <PustakawanGraphStats data={statsPeminjaman} title='Grafik Pengelolaan Peminjaman' Icon={FileCheck2} />
      <PustakawanGraphStats data={statsPerpanjangan} title='Grafik Pengelolaan Perpanjangan' Icon={FilePlus} />
      <PustakawanGraphStats data={statusPengembalian} title='Grafik Pengelolaan Pengembalian' Icon={FileSymlink} />
    </section>
  )
}

export default PustakawanGraphStatsContainer