import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue } from "@/components/ui/select"

const DetailBukuInputContainer = () => {
  const currentYears = new Date().getFullYear()
  const years = Array.from(
    { length: new Date().getFullYear() - 1950 + 1 },
    (_, i) => (1950 + i).toString()
  ).reverse() // biar tahun terbaru di atas
  const bahasa = ['Indonesia' , 'Inggris', 'Jerman', 'Jepang', 'Lainnya']
  const pengadaan = ['Beli' , 'Hibah', 'Donasi', 'Lainnya']

  return (
    <section className='w-full p-4 rounded-xl bg-muted dark:bg-accent/10 '>
      <h1 className='text-lg font-semibold mb-4'>Informasi Detail</h1>

      <main className='w-full flex items-center justify-between gap-x-4'>
        <div className='w-1/2 flex flex-col gap-y-1 mb-2'>
          <Label className='text-xs font-normal'>ISBN</Label>
          <p className='text-[10px] text-muted-foreground'>Nomor identitas buku</p>
          <Input name='ISBN' id='ISBN' required type='text' inputMode='numeric' className='w-full selection:text-white !text-xs placeholder:text-xs border dark:border-none' placeholder='240238409234' />
        </div>

        <div className='w-1/2 flex flex-col gap-y-1 mb-2'>
          <Label className='text-xs font-normal'>Tahun Terbit Buku</Label>
          <p className='text-[10px] text-muted-foreground'>Isi dengan tahun resmi buku diterbitkan.</p>
          <Select name='tahunTerbit' required defaultValue={currentYears.toString()}> 
            <SelectTrigger className="w-full border dark:border-none !text-xs">
              <SelectValue className='!text-xs' placeholder="Pilih tahun" />
            </SelectTrigger>
            <SelectContent className='w-full !text-xs placeholder:text-xs border dark:border-none'>
              {years.map((year) => (
                <SelectItem key={year} value={year} className='text-xs'>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </main>

      <main className='w-full flex items-center justify-between gap-x-4'>
        <div className='w-1/2 flex flex-col gap-y-1 mb-2'>
          <Label className='text-xs font-normal'>Jumlah Halaman</Label>
          <p className='text-[10px] text-muted-foreground'>Masukkan total jumlah halaman yang tercetak dalam buku</p>
          <Input name='jumlahHalaman' id='jumlahHalaman' required className='w-full !text-xs placeholder:text-xs border dark:border-none' placeholder='Total Halaman' />
        </div>

        <div className='w-1/2 flex flex-col gap-y-1 mb-2'>
          <Label className='text-xs font-normal'>Bahasa</Label>
          <p className='text-[10px] text-muted-foreground'>Pilih bahasa utama yang digunakan dalam buku</p>
          <Select name='bahasa' required defaultValue='Indonesia'>
            <SelectTrigger className="w-full border dark:border-none !text-xs">
              <SelectValue className='!text-xs' placeholder="Pilih bahasa buku" />
            </SelectTrigger>
            <SelectContent className='w-full !text-xs placeholder:text-xs border dark:border-none'>
              {bahasa.map((data) => (
                <SelectItem key={data} value={data} className='text-xs'>
                  {data}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </main>

      <main className='w-full flex items-center justify-between gap-x-4'>
        <div className='w-1/2 flex flex-col gap-y-1 mb-2'>
          <Label className='text-xs font-normal'>Ukuran Buku</Label>
          <p className='text-[10px] text-muted-foreground'>Tuliskan ukuran fisik buku dalam satuan cm (panjang × lebar).</p>
          <section className='flex items-center justify-center gap-x-2'>
            <Input name='panjang' id='panjang' required className='w-full !text-xs placeholder:text-[10px] border dark:border-none' placeholder='Panjang Buku' />
            <Input name='lebar' id='lebar' required className='w-full !text-xs placeholder:text-[10px] border dark:border-none' placeholder='Lebar Buku' />  
          </section>
        </div>

        <div className='w-1/2 flex flex-col gap-y-1 mb-2'>
          <Label className='text-xs font-normal'>Sumber Pengadaan</Label>
          <p className='text-[10px] text-muted-foreground'>Catat asal usul buku, misalnya hasil pembelian, hibah, atau donasi.</p>
          <Select name='sumberPengadaan' required defaultValue='Beli'>
            <SelectTrigger className="w-full border dark:border-none !text-xs">
              <SelectValue className='!text-xs' placeholder="Jenis pengadaan" />
            </SelectTrigger>
            <SelectContent className='w-full !text-xs placeholder:text-xs border dark:border-none'>
              {pengadaan.map((data) => (
                <SelectItem key={data} value={data} className='text-xs'>
                  {data}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </main>
    </section>
  )
}

export default DetailBukuInputContainer