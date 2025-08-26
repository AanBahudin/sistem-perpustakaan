import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue } from "@/components/ui/select"

const PriceDanStokContainer = () => {

  const statusKetersediaan = ['Tersedia', 'Tidak Tersedia']
  const featured = ['true', 'false']

  return (
    <section className='w-full p-4 rounded-xl bg-accent/10'>
      <h1 className='text-lg font-semibold mb-4'>Harga dan Stok</h1>

      <main className='w-full flex items-center justify-between gap-x-4'>
        <div className='w-1/2 flex flex-col gap-y-1 mb-2'>
          <Label className='text-xs font-normal'>Harga Ganti</Label>
          <p className='text-[10px] text-muted-foreground'>Harga akan digunakan jika buku dihilangkan</p>
          <Input name='hargaGanti' id='hargaGanti' required type='number' inputMode='numeric' className='w-full !text-xs placeholder:text-xs border-none' placeholder='Masukan dalam jumlah rupiah' />
        </div>

        <div className='w-1/2 flex flex-col gap-y-1 mb-2'>
          <Label className='text-xs font-normal'>Stok Buku</Label>
          <p className='text-[10px] text-muted-foreground'>Jumlah stok buku tersedia</p>
          <Input name='stok' id='stok' type='number' required className='w-full !text-xs placeholder:text-xs border-none' placeholder='10' />
        </div>
      </main>

      <main className='w-full flex items-center justify-between gap-x-4'>
        <div className='w-1/2 flex flex-col gap-y-1 mb-2'>
          <Label className='text-xs font-normal'>Ketersediaan</Label>
          <p className='text-[10px] text-muted-foreground'>Status buku agar siap dipinjam</p>
          <Select name='status' required defaultValue='Tersedia'>
            <SelectTrigger className="w-full border-none !text-xs">
              <SelectValue className='!text-xs' placeholder="Pilih tahun" />
            </SelectTrigger>
            <SelectContent className='w-full !text-xs placeholder:text-xs border-none'>
              {statusKetersediaan.map((data) => (
                <SelectItem key={data} value={data} className='text-xs'>
                  {data}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className='w-1/2 flex flex-col gap-y-1 mb-2'>
          <Label className='text-xs font-normal'>Featured</Label>
          <p className='text-[10px] text-muted-foreground'>Masukan buku ke status unggulan</p>
          <Select name='featured' required defaultValue='false'>
            <SelectTrigger className="w-full border-none !text-xs">
              <SelectValue className='!text-xs' placeholder="Pilih tahun" />
            </SelectTrigger>
            <SelectContent className='w-full !text-xs placeholder:text-xs border-none'>
              {featured.map((data) => (
                <SelectItem key={data} value={data} className='text-xs'>
                  {data === 'true' ? 'Unggulan' : 'Bukan Unggulan'}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </main>
    </section>
  )
}


export default PriceDanStokContainer