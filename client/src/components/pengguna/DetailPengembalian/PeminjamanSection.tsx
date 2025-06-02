import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"
import PeminjamanDanProfilData from "./PeminjamanDanProfilData"

const PeminjamanSection = () => {
  return (
    <section className="w-full my-2 rounded-lg bg-popover px-2 py-4">
        <h2 className='font-bold mb-2 uppercase'>Data Peminjaman</h2>

        <main className="w-full flex flex-col gap-y-4 mt-4">
            <PeminjamanDanProfilData label="ID Peminjaman" value="682e8b94c67642349c1165f2" />
            <PeminjamanDanProfilData label="judul buku" value="682e8b94c67642349c1165f2" />
            <PeminjamanDanProfilData label="status peminjaman" value="682e8b94c67642349c1165f2" />
            <PeminjamanDanProfilData label="durasi peminjaman" value="682e8b94c67642349c1165f2" />
            <PeminjamanDanProfilData label="berakhir pada" value="682e8b94c67642349c1165f2" />
            <PeminjamanDanProfilData label="diproses oleh" value="682e8b94c67642349c1165f2" />
            <PeminjamanDanProfilData label="data pengambilan" value="682e8b94c67642349c1165f2" />
            <Button size='sm' className="dark:text-white text-[12px] mt-4 flex items-center">
                <ExternalLink className="w-4 h-4" />
                Data Peminjaman
            </Button>
        </main>
    </section>
  )
}

export default PeminjamanSection