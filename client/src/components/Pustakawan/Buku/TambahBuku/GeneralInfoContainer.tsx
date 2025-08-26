import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

const GeneralInfoContainer = () => {
  return (
    <section className='w-full p-4 rounded-xl bg-accent/10'>
      <h1 className='text-lg font-semibold mb-4'>Informasi Umum</h1>

      <main className='w-full flex flex-col gap-y-2 mb-2'>
        <Label className='text-xs font-normal'>Judul Buku</Label>
        <Input name='judul' id='judul' required autoFocus className='w-full !text-xs placeholder:text-xs border-none' placeholder='Algoritma dan Struktur Data' />
      </main>

      <main className='w-full flex flex-col gap-y-2 mb-2'>
        <Label className='text-xs font-normal'>Tagline Buku</Label>
        <Textarea name='tagline' id='tagline' required className='w-full !text-xs border-none resize-none' placeholder='Ringkasan unik yang menggambarkan inti buku'></Textarea>
      </main>

      <main className='w-full flex flex-col gap-y-2 mb-4'>
        <Label className='text-xs font-normal'>Deskripsi Buku</Label>
        <Textarea name='deskripsi' id='deskripsi' required placeholder='Jelaskan secara singkat topik, alur, atau pesan utama yang disampaikan' className='w-full !text-xs border-none min-h-[25vh]'></Textarea>
      </main>

      <main className='w-full flex items-center justify-between gap-x-4'>
        <div className='w-1/2 flex flex-col gap-y-1 mb-2'>
          <Label className='text-xs font-normal'>Penulis Buku</Label>
          <p className='text-[10px] text-muted-foreground'>Tambahkan informasi penulis buku</p>
          <Input name='penulis' id='penulis' required className='w-full !text-xs placeholder:text-xs border-none' placeholder='Pramoedya Ananta Toer' />
        </div>

        <div className='w-1/2 flex flex-col gap-y-1 mb-2'>
          <Label className='text-xs font-normal'>Penerbit Buku</Label>
          <p className='text-[10px] text-muted-foreground'>Tambahkan informasi penerbit buku</p>
          <Input name='penerbit' id='penerbit' required className='w-full !text-xs placeholder:text-xs border-none' placeholder='Gramedia Pustaka Utama' />
        </div>
      </main> 
    </section>
  )
}

export default GeneralInfoContainer