import { formatedDate } from '@/utils/formatDate'

type DetailPeminjamanInfoType = {
    peminjaman: any
}

const DetailPeminjamanInfo = ({peminjaman} : DetailPeminjamanInfoType) => {

    const {peminjam} = peminjaman

  return (
    <section className="w-full grid grid-cols-12 gap-x-10 text-xs place-items-start my-4 ml-10 text-muted-foreground">
        <div className='w-full col-span-6 grid grid-cols-2'>
            <main className="flex flex-col gap-y-2 font-semibold">
                <p>Nama Peminjam</p>
                <p>Tanggal Pengajuan</p>
                <p>Lama Peminjaman</p>
                
            </main>

            <main className="flex flex-col gap-y-2">
                <p>: {peminjam.nama}</p>
                <p>: {formatedDate(peminjaman.createdAt)}</p>
                <p>: {peminjaman.durasiPeminjaman} Hari</p>

            </main>
        </div>
        
        <div className='w-full col-span-6 grid grid-cols-2'>
            <main className="flex flex-col gap-y-2 font-semibold">
                <p>Status Peminjaman</p>
                <p>Tanggal Berakhir</p>
                <p>Kondisi Buku</p>
            </main>

            <main className="flex flex-col gap-y-2">
                <p>: {peminjaman.statusPeminjaman}</p>
                <p>: {peminjaman.berakhirPada ? formatedDate(peminjaman.berakhirPada) : '-'}</p>
                <p>: {peminjaman.kondisi ? peminjaman.kondisi : '-'}</p>
            </main>
        </div>
        
    </section>
  )
}

export default DetailPeminjamanInfo