import { Badge } from "@/components/ui/badge"
import DetailPengajuanHeader from "../DetailPengajuanHeader"
import { Separator } from "@/components/ui/separator"
import DetailPengajuanPeminjamanPengembalianTabs from "./DetailPengajuanPeminjamanPengembalianTabs"
import PengembalianDataForm from "./PengembalianDataForm"
import { ImageOff } from "lucide-react"

type BuatPengembalianSectionType = {
    buku: any
    peminjaman: any
}

const BuatPengembalianSection = ({buku, peminjaman} : BuatPengembalianSectionType) => {

    return (
        <section className='w-full flex items-start justify-start gap-x-2'>
            <main className='w-2/4 rounded-xl p-8'>
                <DetailPengajuanHeader />
                <DetailPengajuanPeminjamanPengembalianTabs dataPeminjaman={peminjaman} />
                <Separator />
                <PengembalianDataForm dataPeminjaman={peminjaman} />
            </main>

            <main className="flex-1 p-4 flex flex-col items-start justify-start">
                <h1 className="font-semibold">BUKU YANG DIPINJAM</h1>

                <div className="w-full flex items-start justify-start gap-x-4 mt-4">
                    {buku?.cover ? (
                        <img className="w-32 h-40 rounded object-cover border" src={buku.cover} alt={buku.judul} />
                    ) : (
                        <div className="w-32 h-40 rounded border flex items-center justify-center"> <ImageOff /> </div>
                    )}

                    <div className="flex flex-1 flex-col items-start">
                        <div className="w-full flex gap-2 my-1 flex-wrap">
                            {buku.kategori.map((item: string, index: number) => {
                                return <Badge className="text-xs text-white" key={index}>{item}</Badge>
                            })}
                        </div>
                        <h1 className="font-medium">{buku.judul}</h1>
                        <h5 className="text-muted-foreground text-xs">{buku.tagline}</h5>

                        <div className="w-full flex flex-col gap-y-2 my-2">
                            <div className="flex items-center gap-x-2 text-xs text-muted-foreground">
                                <h5 className="w-1/5">ISBN</h5>
                                <p>:</p>
                                <p>{buku.ISBN}</p>
                            </div>

                            <div className="flex items-center gap-x-2 text-xs text-muted-foreground">
                                <h5 className="w-1/5">Penulis</h5>
                                <p>:</p>
                                <p>{buku.penulis}</p>
                            </div>

                            <div className="flex items-center gap-x-2 text-xs text-muted-foreground">
                                <h5 className="w-1/5">Penerbit</h5>
                                <p>:</p>
                                <p>{buku.penerbit}</p>
                            </div>

                            <div className="flex items-center gap-x-2 text-xs text-muted-foreground">
                                <h5 className="w-1/5">Tahun Terbit</h5>
                                <p>:</p>
                                <p>{new Date(buku.tahunTerbit).getFullYear()}</p>
                            </div>
                        </div>

                        <Separator className="mb-2" />
                        <div className="w-full h-[15vh] overflow-y-sacroll scroll-custom">
                            <p className="text-muted-foreground text-xs">{buku.deskripsi}</p>
                        </div>
                    </div>
                </div>
            </main>
        </section>
    )
}

export default BuatPengembalianSection