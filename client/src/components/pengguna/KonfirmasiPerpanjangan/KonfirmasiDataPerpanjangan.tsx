import SelectDurasi from '../KonfirmasiPeminjaman/SelectDurasi'
import AlasanInput from '../KonfirmasiPeminjaman/AlasanInput'
import NamaBox from '../KonfirmasiPeminjaman/NamaBox'
import { useQuery } from '@tanstack/react-query'
import { penggunaGetProfileAction } from '@/actions/Pengguna/Profil'
import { DiajukkanStatus } from '../KonfirmasiPeminjaman/StatusConfirm'
import ConfirmPerpanjanganDialog from '@/components/dialog/ConfirmPerpanjanganDialog'

const KonfirmasiDataPerpanjangan = ({perpanjangan, peminjaman} : {perpanjangan: any, peminjaman: any}) => {

    const {data: profil, isLoading} = useQuery({
        queryKey: ['profil'],
        queryFn: penggunaGetProfileAction
    })

    return (
        <section className="w-1/3 h-fit border rounded-2xl p-4">
            <h1 className="uppercase text-sm font-bold">Pengajuan peminjaman</h1>
            <p className="text-muted-foreground text-[12px] my-2">Silakan lengkapi data berikut untuk memproses permintaan peminjaman buku. Pastikan informasi yang Anda masukkan sudah benar</p>

            <main className="w-full flex flex-col gap-y-4 mt-7">
                {isLoading ? (
                    <p>Memuat</p>
                ) : <NamaBox nama={profil.nama} />}
                <SelectDurasi defaultDurasi={perpanjangan?.durasi} perpanjangan={perpanjangan} />
                <AlasanInput defaultAlasan={perpanjangan?.alasan} perpanjangan={perpanjangan} type='perpanjangan' />
            </main>

            
            {(perpanjangan?.disetujui === 'Ditolak' || !perpanjangan?.disetujui) && <ConfirmPerpanjanganDialog peminjaman={peminjaman} />}
            {/* <ConfirmPerpanjanganDialog peminjaman={peminjaman} /> */}
            {perpanjangan?.disetujui === 'Pending' || perpanjangan?.disetujui === 'Diterima' && <DiajukkanStatus link={`/my/perpanjangan/${perpanjangan._id}`} />}
        </section>
    )
}

export default KonfirmasiDataPerpanjangan