import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { hitungMundurTanggal } from '@/utils/hitungMundurTanggal'

const DeadlineTable = ({peminjaman} : {peminjaman:any}) => {
  return (
    <ScrollArea className="col-span-12 lg:col-span-6 h-[250px] lg:h-[350px] rounded-xl border bg-card">
        <div className="p-4">
        <h4 className="mb-8 text-md font-medium leading-none">Deadline Peminjaman</h4>
        {peminjaman.map((item: any, index: number) => {
          const {buku} = item
          return (
            <>
              <div key={index} className="text-sm flex justify-between">
                    <h1>{buku.judul}</h1>
                    <p className='text-muted-foreground'>{hitungMundurTanggal(item.berakhirPada)}</p>
                </div>
              <Separator className="my-2" />
            </>
          )
        }) }
        </div>
    </ScrollArea>
  )
}

export default DeadlineTable