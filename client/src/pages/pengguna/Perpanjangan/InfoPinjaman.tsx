import { useState } from 'react'
import { DiajukkanAlert, DefaultAlert } from '../Buku/Alert'
import GridLayoutButtons from '@/globals/GridLayoutButtons'
import { Link } from 'react-router-dom'
import { ImageOff } from 'lucide-react'

type InfoPinjamanType = {
    peminjaman: any,
    perpanjangan: any
}

const InfoPinjaman = ({peminjaman, perpanjangan} : InfoPinjamanType) => {
    const [showMore, setShowMore] = useState(false)
        const handleSetShow = () => {
        setShowMore(!showMore)
    }
    const {buku: detailBuku} = peminjaman
    const newDesc = detailBuku.deskripsi.slice(0, 350) + '....'

    return (
        <section className="w-full min-h-[60vh] h-fit border rounded-2xl p-10">
            {perpanjangan?.disetujui === 'Pending' ? (
                <DiajukkanAlert 
                    title='Perpanjangan Telah Diajukan'
                    deskripsi="Anda dapat melihat detail perpanjangan anda"
                    link={`/my/perpanjangan/${perpanjangan?._id}/${peminjaman.buku._id}`} />
            ) : (
                <DefaultAlert 
                    title="Selesaikan Pengajuan Anda" 
                    description="Silahkan isi data perpanjangan untuk menyelesaikan perpanjangan buku" />
            )}

            <main className="flex gap-x-6 mt-6">

            <div className="w-24 aspect-square overflow-hidden">
                {detailBuku.cover ? (
                    <img className="w-full object-cover rounded-lg" src={detailBuku.cover} alt={detailBuku.judul} />
                ) : (
                    <div className='w-full h-full rounded-lg border flex items-center justify-center'> <ImageOff /> </div>
                )}
            </div>

            <div className="w-[80%]">
                <div className="flex items-center justify-between mb-3">
                    <Link to={`/my/buku/${detailBuku._id}`} className="text-2xl font-bold hover:underline">{detailBuku.judul}</Link>
                    <GridLayoutButtons id={detailBuku._id} />
                </div>
                <p className="text-muted-foreground text-[12px] italic">{detailBuku.tagline}</p>
                <p className="text-muted-foreground text-[12px] font-semibold">By {detailBuku.penulis}</p>
                <p className="my-3 font-semibold">Deskripsi</p>
                <p onClick={handleSetShow} className="text-[12px] text-muted-foreground hover:underline cursor-default duration-200 ease-in-out">{showMore ? detailBuku.deskripsi : newDesc} {showMore }</p>
            </div>
            </main>
        </section>
    )
}

export default InfoPinjaman