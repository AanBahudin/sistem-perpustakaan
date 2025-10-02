import ConfirmPeminjaman from "@/components/dialog/ConfirmPeminjaman"
import SelectDurasi from "./SelectDurasi"
import NamaBox from "./NamaBox"
import AlasanInput from "./AlasanInput"
import { ConfirmButton, DiajukkanStatus } from "./StatusConfirm"

type KonfirmasiDataType = {
    profil: any
    data: any,
    pinjaman: any
}

const KonfirmasiData = ({profil, data, pinjaman} : KonfirmasiDataType) => {

    const {data: dataDetail, durasi} = data

    return (
        <section className="w-1/3 h-fit border rounded-2xl p-4">
            <h1 className="uppercase text-sm font-bold">Pengajuan peminjaman</h1>
            <p className="text-muted-foreground text-[12px] my-2">Silakan lengkapi data berikut untuk memproses permintaan peminjaman buku. Pastikan informasi yang Anda masukkan sudah benar</p>

            <main className="w-full flex flex-col gap-y-4 mt-7">
                <NamaBox nama={profil.nama} />
                <SelectDurasi defaultDurasi={pinjaman?.durasiPeminjaman} durasi={durasi} />
                <AlasanInput defaultAlasan={pinjaman?.alasan} />
            </main>

            {pinjaman?.statusPeminjaman !== 'Diajukan' && <ConfirmPeminjaman buku={dataDetail} />}
            {pinjaman?.statusPeminjaman === 'Diajukan' || pinjaman?.statusPeminjaman === 'Dipinjam' && <DiajukkanStatus link={`/my/peminjaman/${pinjaman._id}/${pinjaman.buku._id}`} />}
        </section>
    )
}

export default KonfirmasiData