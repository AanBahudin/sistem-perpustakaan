import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { Separator } from "@/components/ui/separator"
import DetailPengajuanInformation from "./DetailPengajuanInformation"

const DetailBukuPengajuan = ({dataBuku} : {dataBuku: any}) => {

    const [showAllText, setShowAllText] = useState(false)
    const newText = showAllText ? dataBuku.deskripsi : dataBuku.deskripsi.slice(0, 250) + '...'

    return (
        <section className='w-full'>
            <h1 className='text-sm font-semibold'>Detail buku</h1>
            <p className='text-muted-foreground text-xs'>Detail buku untuk informasi lanjutan</p>
            <Separator className='my-4'/>

            {/* DETAIL BUKU SECTION */}
        
            <section className='w-full flex items-start justify-start gap-x-10'>
                <img className='w-40 h-44 rounded-xl object-cover border' src={dataBuku.cover} alt={dataBuku.judul} />

                <main className='flex-1'>
                    <h1 className='text-xl font-semibold'>{dataBuku.judul}</h1>
                    <p className='text-xs text-muted-foreground'>{dataBuku.tagline.slice(0, 80)}...</p>
                    <div className='w-full flex flex-wrap gap-2 my-1'>
                        {dataBuku.kategori.map((item: string, index: number) => {
                            return (
                                <Badge key={index} className='text-white'>{item}</Badge>
                            )
                        })}
                    </div>
                    <p className='text-xs pr-1 mt-2 text-muted-foreground h-fit max-h-[15vh] overflow-y-auto scroll-custom'>{newText} <span onClick={() => setShowAllText(!showAllText)} className='hover:underline duration-200 ease-in-out cursor-default italic hover:text-primary'>Lihat {showAllText ? 'lebih sedikit' : 'selangkapnya'}</span></p>

                    <div className='w-full bg-muted p-2 rounded text-muted-foreground text-xs mt-4 gap-y-1 flex flex-col'>
                        <DetailPengajuanInformation label="Penulis" value={dataBuku.penulis} />
                        <DetailPengajuanInformation label="Penerbit" value={dataBuku.penerbit} />
                        <DetailPengajuanInformation label="Tahun Terbit" value={(new Date(dataBuku.tahunTerbit).getFullYear()).toString()} />
                        <DetailPengajuanInformation label="ISBN" value={dataBuku.ISBN} />
                    </div>
                </main>
            </section>
        </section>
    )
}
export default DetailBukuPengajuan