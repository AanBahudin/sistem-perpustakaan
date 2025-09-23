import { formatRupiah } from "@/utils/formatCurrency"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import ConfirmPengembalianDialog from "./ConfirmPengembalianDialog"

const InvoiceDetail = ({pengembalian} : {pengembalian: any}) => {

    return (
        <section className="flex-1 min-h-[20vh] rounded-lg border p-4">
            <h1 className="font-semibold">Informasi Pembayaran</h1>

            <main className="w-full text-xs text-muted-foreground mt-6 mb-2 flex flex-col gap-y-3">
                <div className="w-full flex items-start justify-between">
                    <p>Denda Terlambat</p>
                    <div className="flex flex-col justify-end items-end">
                        <p className="dark:text-white text-black">{formatRupiah(1500)} x {pengembalian.durasiKeterlambatan} Hari</p>
                        <p className="text-[10px] text-white font-semibold">{formatRupiah(pengembalian.dendaKeterlambatan)}</p>
                    </div>
                </div>

                <div className="w-full flex items-start justify-between">
                    <p>Denda Fisik</p>
                    <div className="flex flex-col justify-end items-end">
                        <p className="dark:text-white text-black font-semibold">{formatRupiah(pengembalian.dendaFisik)}</p>
                        {pengembalian.isMissing ? (
                            <p className="text-[10px] text-destructive/70 font-semibold">Harga buku</p>
                        ) : (
                            <p className="text-[10px] text-destructive/70 font-semibold">kondisi {pengembalian.keadaanBuku}</p>
                        )}
                    </div>
                </div>
                <Separator />

                <div className="w-full flex items-start justify-between text-sm font-semibold dark:text-white text-black">
                    <p>Total Pembayaran</p>
                    <p>{formatRupiah(pengembalian.totalDenda)}</p>
                </div>

                {/* TOMBOL BAYAR HANYA KELIHATAN JIKA PENGEMBALIAN SUDAH DIBAYAR */}
                {(pengembalian.statusPembayaran === 'Belum Bayar' && pengembalian.statusPengembalian === 'Pending') && (
                    <ConfirmPengembalianDialog>
                        <Button className="mt-4 text-xs text-white">Bayar dan Simpan</Button>
                    </ConfirmPengembalianDialog>
                )}
            </main>
        </section>
    )
}

export default InvoiceDetail