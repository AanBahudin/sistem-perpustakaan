import { Badge } from "@/components/ui/badge"
import { formatRupiah } from "@/utils/formatCurrency"

const DetailBukuInfo = ({buku} : {buku: any}) => {

    return (
        <section className='mb-2'>
            <p className='text-xs font-semibold mb-1'>Informasi Buku</p>
            <main className='w-full rounded min-h-[10vh]'>
                <DetailInfoBukuTabel buku={buku} />
            </main>
        </section>
    )
}

const DetailInfoBukuTabel = ({buku} : {buku: any}) => {

    const { ISBN, penerbit, jumlahHalaman, ukuranBuku, stok, status, sumberPengadaan, hargaGanti, createdBy } = buku
    console.log(buku)
    const judul: Array<string> = ['ISBN', 'Penerbit', 'Jumlah Halaman', 'Ukuran Buku', 'Stok', 'Ketersediaan', 'Sumber Pengadaan', 'Harga Ganti', 'Diinput Oleh']
    const newUkuran = `${ukuranBuku.panjang} cm x ${ukuranBuku.lebar} cm`
    const newHalaman = `${jumlahHalaman} Halaman`
    const newStok = `${stok} Buku`
    const newHarga = formatRupiah(hargaGanti)
    const newPustakawanNama = createdBy?.nama || '-'
    const value = [ISBN, penerbit, newHalaman, newUkuran, newStok, status, sumberPengadaan, newHarga, newPustakawanNama]

    return (
        <section className="!p-0 flex flex-col gap-y-1 ml-3">
            {judul.map((item: string, index: number) => {
                return (
                    <main key={index} className="w-full flex text-xs text-muted-foreground border-none">
                        <p className="min-w-[150px]">{item}</p>
                        <p>:</p>
                        {item === 'Ketersediaan' ? <Badge className="text-xs text-white ml-4">{value[index]}</Badge> : (
                            <p className="ml-4">{value[index]}</p>
                        )}
                    </main>
                )
            })}
        </section>
    )
}

export default DetailBukuInfo