import DetailPengajuanInformation from "../DetailPeminjaman/DetailPengajuanInformation"
import { formatedDate } from "@/utils/formatDate"

type PerpanjanganDetailPeminjamanSectionType = {
    dataBuku: any,
    dataPeminjaman: any,
    pengguna: any
}

const PerpanjanganDetailPeminjamanSection = ({dataBuku, dataPeminjaman, pengguna} : PerpanjanganDetailPeminjamanSectionType) => {
  return (
    <section className='w-fuil p-4 bg-muted my-4 rounded-sm flex items-start gap-x-8'>
        <main className='w-1/2'>
            <h1 className='text-sm font-light'>Detail Peminjaman</h1>
            <p className='text-xs text-muted-foreground mt-2'>Peminjaman - {dataPeminjaman._id}</p>

            <div className='w-full text-muted-foreground text-xs mt-4 gap-y-1 flex flex-col'>
                <DetailPengajuanInformation label="Tanggal Pengajuan" value={formatedDate(dataPeminjaman.createdAt)} />
                <DetailPengajuanInformation label="Batas Peminjaman" value={formatedDate(dataPeminjaman.berakhirPada)} />
                <DetailPengajuanInformation label="Durasi Peminjaman" value={dataPeminjaman.durasiPeminjaman + ' Hari'} />
                <DetailPengajuanInformation label="Status Pengajuan" value={dataPeminjaman.statusPeminjaman} />
                <DetailPengajuanInformation label="Judul Buku" value={dataBuku?.judul?.slice(0, 22) || dataPeminjaman.judulBuku.slice(0, 22)} />
                <DetailPengajuanInformation label="Kondisi Buku" value={dataPeminjaman?.kondisi} />
            </div>
        </main>

        <main className='flex-1 flex flex-col items-end h-fit'>
            <h1 className='text-sm font-light'>Diajukan Oleh</h1>
            <p className='text-xs text-muted-foreground mt-2 font-semibold'>{pengguna.nama}</p>
            <p className='text-xs text-muted-foreground'>{pengguna.email}</p>
            <p className='text-xs text-muted-foreground'>{pengguna.idKampus} - {pengguna.role}</p>
        </main>
    </section>
  )
}

export default PerpanjanganDetailPeminjamanSection