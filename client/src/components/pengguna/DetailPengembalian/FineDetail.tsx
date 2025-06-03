import { formatRupiah } from "@/utils/formatCurrency"
import { Separator } from "@/components/ui/separator"

type FineDetailType = {
    pengembalian: any
}

const FineDetail = ({pengembalian} : FineDetailType) => {

    let {durasiKeterlambatan, dendaFisik, dendaKeterlambatan, totalDenda, isMissing, dendaKehilangan} = pengembalian

    return (
        <section>
            <div className='w-full flex flex-col gap-y-2 mt-2 text-muted-foreground text-[12px] capitalize'>
                <div className='flex items-center justify-between'>
                    <p>Keterlambatan</p>
                    <p>{formatRupiah(dendaKeterlambatan)} (x {durasiKeterlambatan} hari)</p>
                </div>

                <div className='flex items-center justify-between'>
                    <p>denda fisik</p>
                    <p>{formatRupiah(dendaFisik)}</p>
                </div>

                <div className='flex items-center justify-between'>
                    <p>denda kehilangan</p>
                    <p>{isMissing ? formatRupiah(dendaKehilangan) : '-'}</p>
                </div>
                <Separator />
                <div className='flex items-center justify-between text-lg font-bold text-primary'>
                    <p className='text-lg font-bold text-primary'>Total</p>
                    <p>{formatRupiah(totalDenda)}</p>
                </div>
            </div>
        </section>
    )
}

export default FineDetail