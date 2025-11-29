import BreadCrumbDetailBuku from "./BreadCrumbDetailBuku"
import GridLayoutButtons from "@/globals/GridLayoutButtons"
import InformationContainer from "./InformationContainer"
import StatsDetailInfo from "./StatsDetailInfo"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { CircleAlert, ImageOff, Plus } from "lucide-react"
import { DangerAlert, DefaultAlert, LinkAlert } from "@/components/pengguna/KonfirmasiPeminjaman/Alert"

type DetailBookContainerDataType = {
    peminjaman: any,
    detailBuku: any,
}

const DetailBookContainer = ({peminjaman, detailBuku} : DetailBookContainerDataType) => {

    const newTagline = detailBuku.tagline.slice(0,76) +"...."

    return (
        <section className="w-[80%] mx-auto">
            {peminjaman?.statusPeminjaman === 'Diajukan' ? (
                <LinkAlert 
                    title="Terdapat Peminjaman" 
                    description="Peminjaman telah di ajukkan untuk buku ini, Silahkan cek peminjaman anda " 
                    Icon={CircleAlert} 
                    link={`/my/peminjaman/${peminjaman._id}/${peminjaman.buku._id}`} />
            ) : ( peminjaman?.statusPeminjaman === 'Dipinjam' ? (
                <DefaultAlert title="Terdapat Peminjaman" description="Anda memiliki peminjaman pada buku ini, Cek ke menu peminjaman untuk info selengkapnya" />
            ) : (peminjaman?.statusPeminjaman === 'Terlambat' ? (
                <DangerAlert 
                    title="Peminjaman Telah Melewati Batas Waktu" 
                    description="Untuk menghindari denda, Silahkan lakukan pengembalian buku"/>  
            ) : null)
            )}
            <BreadCrumbDetailBuku title={detailBuku.judul} from="Buku" url="/my/buku" />

            <main className="w-full flex my-10 gap-x-10">
                {detailBuku.cover ? (
                    <img className="w-[400px] h-[400px] object-contain rounded-2xl border p-4" src={detailBuku.cover} alt={detailBuku.judul} />
                ) : (
                    <div className="w-[700px] h-[400px] rounded-2xl border flex items-center justify-center"> <ImageOff className="w-14" /> </div>
                )}

                <div className="flex justify-start flex-col">
                    <div className="w-full flex justify-between items-center">
                        <h1 className="text-2xl font-semibold">{detailBuku.judul}</h1>
                        <GridLayoutButtons id={detailBuku._id}/>
                    </div>

                    <h5 className="text-muted-foreground text-sm w-full trun my-2">{newTagline}</h5>

                    <StatsDetailInfo data={detailBuku} />

                    <p className="my-4 text-muted-foreground text-sm leading-6 bg-muted p-3 rounded-lg">{detailBuku.deskripsi}</p>
                    <InformationContainer data={detailBuku} />

                    {peminjaman?.statusPeminjaman === 'Dipinjam' ? (
                        null
                    ) : (
                        detailBuku.stok <= 0 ? (
                            <Button variant='destructive' className="!dark:text-white mt-6 flex items-center">Buku Telah Habis</Button>
                        ) : (
                            <Button className="w-1/3 !dark:text-white mt-6 flex items-center" variant='secondary'>
                                <Plus />
                                <Link className="text-[12px] capitalize" to={`/my/confirm/peminjaman/${detailBuku._id}`}>Tambahkan ke peminjaman</Link>
                            </Button>
                        )
                    )}
                </div> 
            </main>

            
        </section>
    )
}

export default DetailBookContainer