import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"
import PeminjamanDanProfilData from "./PeminjamanDanProfilData"
import { formatedDate } from "@/utils/formatDate"
import { Link } from "react-router-dom"

type PeminjamanSectionType = {
  peminjaman: any,
  linkTarget?: string
}

const PeminjamanSection = ({peminjaman, linkTarget='peminjaman'} : PeminjamanSectionType) => {

  console.log(peminjaman)

  let { _id, buku:dataBuku, judulBuku, statusPeminjaman, durasiPeminjaman, berakhirPada, diprosesOleh: pustakawan, dataPengembalian } = peminjaman
  berakhirPada = formatedDate(berakhirPada)
  return (
    <section className="w-full my-2 rounded-lg bg-popover px-2 py-4">
        <h2 className='font-bold mb-2 uppercase'>Data Peminjaman</h2>

        <main className="w-full flex flex-col gap-y-4 mt-4">
            <PeminjamanDanProfilData label="ID Peminjaman" value={_id} />
            <PeminjamanDanProfilData label="judul buku" value={judulBuku || dataBuku.judul} />
            <PeminjamanDanProfilData label="status peminjaman" value={statusPeminjaman} />
            <PeminjamanDanProfilData label="durasi peminjaman" value={`${durasiPeminjaman} Hari`} />
            <PeminjamanDanProfilData label="berakhir pada" value={berakhirPada} />
            <PeminjamanDanProfilData label="diproses oleh" value={pustakawan.nama || 'Belum diproses'} />
            {dataPengembalian && (
              <PeminjamanDanProfilData label="data pengambilan" value={dataPengembalian._id || 'Belum diselesaikan'} />
            )}
            <Button size='sm' className="dark:text-white text-[12px] mt-4 flex items-center">
                <Link to={`/my/${linkTarget}/${_id}/${dataBuku._id}`} className="flex items-center gap-x-2">
                  <ExternalLink className="w-4 h-4" />
                  Data Peminjaman
                </Link>
            </Button>
        </main>
    </section>
  )
}

export default PeminjamanSection