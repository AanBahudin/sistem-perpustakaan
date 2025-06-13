import { useState } from "react"
import { Link } from "react-router-dom"
import GridLayoutButtons from "@/globals/GridLayoutButtons"
import { DefaultAlert, DiajukkanAlert } from "./Alert"

type PeminjamanInfoType = {
    detailBuku: any,
    peminjaman: any
}

const PeminjamanInfo = ({detailBuku, peminjaman} : PeminjamanInfoType) => {

    const [showMore, setShowMore] = useState(false)
    const handleSetShow = () => {
        setShowMore(!showMore)
    }

    const newDesc = detailBuku.deskripsi.slice(0, 350) + '....'

    return (
        <section className="w-full min-h-[60vh] h-fit border rounded-2xl p-10">
            {peminjaman?.statusPeminjaman === 'Diajukan' ? (
                <DiajukkanAlert idPinjam={`${peminjaman._id}/${peminjaman.buku._id}`} />
            ) : (
                <DefaultAlert title="Selesaikan Pengajuan Anda" description="Silahkan isi data peminjaman untuk menyelesaikan peminjaman buku" />
            )}

            <main className="flex gap-x-6 mt-6">

            <div className="w-24 aspect-square overflow-hidden">
                <img className="w-full object-cover rounded-lg" src={detailBuku.cover} alt={detailBuku.judul} />
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

export default PeminjamanInfo