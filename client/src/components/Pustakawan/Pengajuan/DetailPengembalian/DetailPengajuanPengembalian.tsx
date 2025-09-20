import { Textarea } from "@/components/ui/textarea"
import DetailPengajuanInformation from "../DetailPeminjaman/DetailPengajuanInformation"
import DetailUserInformationPengembalian from "./DetailUserInformationPengembalian"
import { formatedDate } from "@/utils/formatDate"

const DetailPengajuanPengembalian = ({dataPengembalian, peminjaman, pengguna} : {dataPengembalian: any, peminjaman: any, pengguna: any}) => {

    const pengembalian = dataPengembalian

    return (
         <section className="w-full">
            <h1 className="font-semibold text-sm">Detail Pengembalian</h1>
            <p className="text-xs text-muted-foreground">Informasi lengkap pengembalian buku beserta denda</p>

            <main className="w-full flex items-start justify-start gap-x-4 mt-4">
                <div className="w-full flex-1 text-muted-foreground text-xs h-fit">
                    <section className="w-[70%] flex flex-col gap-y-3">
                        <DetailPengajuanInformation label="Id Pengembalian" value={pengembalian._id} /> 
                        <DetailPengajuanInformation label="Tanggal Peminjaman" value={formatedDate(peminjaman.createdAt)} /> 
                        <DetailPengajuanInformation label="Tanggal Pengembalian" value={pengembalian.tanggalPengembalian ? formatedDate(pengembalian.tanggalPengembalian) : 'Belum ada'} /> 
                        <DetailPengajuanInformation label="Lama peminjaman" value={peminjaman.durasiPeminjaman + ' Hari'} /> 
                        <DetailPengajuanInformation label="Akhir Peminjaman" value={formatedDate(peminjaman.berakhirPada)} /> 
                        <DetailPengajuanInformation label="Total Hari Terlambat" value={pengembalian.durasiKeterlambatan + ' Hari'}  />
                        <DetailPengajuanInformation label="Status Pengembalian" value={pengembalian.statusPengembalian} /> 
                        <DetailPengajuanInformation label="Kondisi Buku Pengembalian" value={pengembalian.keadaanBuku} /> 
                        <div className='w-full flex flex-col'>
                            <p className='w-1/2 mb-1'>Catatan</p>
                            <Textarea className="!text-[12px]" readOnly>{pengembalian.catatan}</Textarea>
                        </div>
                    </section>
                </div>
                <DetailUserInformationPengembalian pengguna={pengguna} />
            </main>
                    
        </section>
    )
}

export default DetailPengajuanPengembalian