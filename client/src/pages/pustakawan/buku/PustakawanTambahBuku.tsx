import PustakawanBreadCrumbs from '@/components/Pustakawan/PustakawanBreadCrumbs'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import Container from '@/globals/Container'
import { BookOpenText, Camera, CheckCircle } from 'lucide-react'

const PustakawanTambahBuku = () => {
  return (
    <Container className='w-full'>
      <PustakawanBreadCrumbs />
      <PustakawanTambahBukuHeader />
      <InputDataContainer />
    </Container>
  )
}

const PustakawanTambahBukuHeader = () => {
  return (
    <section className='w-full flex items-center justify-center my-10'>
      <main className='flex-1 flex items-center justify-start gap-x-4'>
        <BookOpenText className='w-6 h-6' />
        <h1 className='font-light text-xl'>Tambah Buku Baru</h1>
      </main>
      <Button className='flex items-center justify-center gap-x-2 text-white text-xs font-normal leading-4'>
        <CheckCircle className='w-4 h-4' />
        Simpan Buku
      </Button>
    </section>
  )
}

const InputDataContainer = () => {
  return (
    <section className='w-full flex items-start justify-start gap-x-6'>
      <InputDataSection />
      <SecondaryInputDataSection />
    </section>
  )
}

const InputDataSection = () => {
  return (
    <section className='w-[70%] flex flex-col items-center justify-center gap-y-4'> 
      <GeneralInfoContainer />
      <DetailBukuContainer />
      <PriceDanStokContainer />
    </section>
  )
}

const GeneralInfoContainer = () => {
  return (
    <section className='w-full p-4 rounded-xl bg-accent/10'>
      <h1 className='text-lg font-semibold mb-4'>Informasi Umum</h1>

      <main className='w-full flex flex-col gap-y-2 mb-2'>
        <Label className='text-xs font-normal'>Judul Buku</Label>
        <Input className='w-full !text-xs placeholder:text-xs border-none' placeholder='Algoritma dan Struktur Data' />
      </main>

      <main className='w-full flex flex-col gap-y-2 mb-2'>
        <Label className='text-xs font-normal'>Tagline Buku</Label>
        <Textarea className='w-full !text-xs border-none resize-none' placeholder='Ringkasan unik yang menggambarkan inti buku'></Textarea>
      </main>

      <main className='w-full flex flex-col gap-y-2 mb-4'>
        <Label className='text-xs font-normal'>Deskripsi Buku</Label>
        <Textarea placeholder='Jelaskan secara singkat topik, alur, atau pesan utama yang disampaikan' className='w-full !text-xs border-none min-h-[25vh]'></Textarea>
      </main>

      <main className='w-full flex items-center justify-between gap-x-4'>
        <div className='w-1/2 flex flex-col gap-y-1 mb-2'>
          <Label className='text-xs font-normal'>Penulis Buku</Label>
          <p className='text-[10px] text-muted-foreground'>Tambahkan informasi penulis buku</p>
          <Input className='w-full !text-xs placeholder:text-xs border-none' placeholder='Pramoedya Ananta Toer' />
        </div>

        <div className='w-1/2 flex flex-col gap-y-1 mb-2'>
          <Label className='text-xs font-normal'>Penerbit Buku</Label>
          <p className='text-[10px] text-muted-foreground'>Tambahkan informasi penerbit buku</p>
          <Input className='w-full !text-xs placeholder:text-xs border-none' placeholder='Gramedia Pustaka Utama' />
        </div>
      </main> 
    </section>
  )
}

const DetailBukuContainer = () => {
  return (
    <section className='w-full p-4 rounded-xl bg-accent/10'>
      <h1 className='text-lg font-semibold mb-4'>Informasi Detail</h1>

      <main className='w-full flex items-center justify-between gap-x-4'>
        <div className='w-1/2 flex flex-col gap-y-1 mb-2'>
          <Label className='text-xs font-normal'>ISBN</Label>
          <p className='text-[10px] text-muted-foreground'>Nomor identitas buku</p>
          <Input className='w-full !text-xs placeholder:text-xs border-none' placeholder='' />
        </div>

        <div className='w-1/2 flex flex-col gap-y-1 mb-2'>
          <Label className='text-xs font-normal'>Tahun Terbit Buku</Label>
          <p className='text-[10px] text-muted-foreground'>Jumlah stok buku tersedia</p>
          <Input className='w-full !text-xs placeholder:text-xs border-none' placeholder='Gramedia Pustaka Utama' />
        </div>
      </main>

      <main className='w-full flex items-center justify-between gap-x-4'>
        <div className='w-1/2 flex flex-col gap-y-1 mb-2'>
          <Label className='text-xs font-normal'>Jumlah Halaman</Label>
          <p className='text-[10px] text-muted-foreground'>Nomor identitas buku</p>
          <Input className='w-full !text-xs placeholder:text-xs border-none' placeholder='' />
        </div>

        <div className='w-1/2 flex flex-col gap-y-1 mb-2'>
          <Label className='text-xs font-normal'>Bahasa</Label>
          <p className='text-[10px] text-muted-foreground'>Jumlah stok buku tersedia</p>
          <Input className='w-full !text-xs placeholder:text-xs border-none' placeholder='Gramedia Pustaka Utama' />
        </div>
      </main>

      <main className='w-full flex items-center justify-between gap-x-4'>
        <div className='w-1/2 flex flex-col gap-y-1 mb-2'>
          <Label className='text-xs font-normal'>Ukuran Buku</Label>
          <p className='text-[10px] text-muted-foreground'>Nomor identitas buku</p>
          <Input className='w-full !text-xs placeholder:text-xs border-none' placeholder='' />
        </div>

        <div className='w-1/2 flex flex-col gap-y-1 mb-2'>
          <Label className='text-xs font-normal'>Sumber Pengadaan</Label>
          <p className='text-[10px] text-muted-foreground'>Cara pengadan buku</p>
          <Input className='w-full !text-xs placeholder:text-xs border-none' placeholder='' />
        </div>
      </main>
    </section>
  )
}

const PriceDanStokContainer = () => {
  return (
    <section className='w-full p-4 rounded-xl bg-accent/10'>
      <h1 className='text-lg font-semibold mb-4'>Harga dan Stok</h1>

      <main className='w-full flex items-center justify-between gap-x-4'>
        <div className='w-1/2 flex flex-col gap-y-1 mb-2'>
          <Label className='text-xs font-normal'>Harga Ganti</Label>
          <p className='text-[10px] text-muted-foreground'>Harga akan digunakan jika buku dihilangkan</p>
          <Input className='w-full !text-xs placeholder:text-xs border-none' placeholder='Pramoedya Ananta Toer' />
        </div>

        <div className='w-1/2 flex flex-col gap-y-1 mb-2'>
          <Label className='text-xs font-normal'>Stok Buku</Label>
          <p className='text-[10px] text-muted-foreground'>Jumlah stok buku tersedia</p>
          <Input className='w-full !text-xs placeholder:text-xs border-none' placeholder='Gramedia Pustaka Utama' />
        </div>
      </main>

      <main className='w-full flex items-center justify-between gap-x-4'>
        <div className='w-1/2 flex flex-col gap-y-1 mb-2'>
          <Label className='text-xs font-normal'>Ketersediaan</Label>
          <p className='text-[10px] text-muted-foreground'>Status buku agar siap dipinjam</p>
          <Input className='w-full !text-xs placeholder:text-xs border-none' placeholder='Pramoedya Ananta Toer' />
        </div>

        <div className='w-1/2 flex flex-col gap-y-1 mb-2'>
          <Label className='text-xs font-normal'>Featured</Label>
          <p className='text-[10px] text-muted-foreground'>Masukan buku ke status unggulan</p>
          <Input className='w-full !text-xs placeholder:text-xs border-none' placeholder='Gramedia Pustaka Utama' />
        </div>
      </main>
    </section>
  )
}

const SecondaryInputDataSection = () => {
  return (
    <section className='flex-1 rounded-xl flex flex-col items-center justify-center gap-y-4'>
      <UploadImageContainer />
      <CategorySectionContainer />
    </section>
  )
}

const UploadImageContainer = () => {
  return (
    <section className='w-full p-4 bg-accent/10 rounded-xl'>
      <h1 className='text-lg font-semibold mb-4'>Upload Gambar</h1>
      <main className='w-full min-h-[40vh] rounded-lg bg-accent/40 flex items-center justify-center'>
        <Camera className='w-20 h-20 stroke-1 stroke-muted-foreground' />
      </main>
      <Button className='text-xs text-white w-full mt-4'>Upload Gambar</Button>
      
    </section>
  )
}

const CategorySectionContainer = () => {
  return (
    <section className='w-full p-4 bg-accent/10 rounded-xl'>
      <h1 className='text-lg font-semibold mb-4'>Kategori</h1>
      <main className='w-full flex flex-col gap-y-2 mb-2'>
        <Label className='text-xs font-normal'>Kategori Buku</Label>
        <Input className='w-full !text-xs placeholder:text-xs border-none' placeholder='Algoritma dan Struktur Data' />
      </main>
      <Button className='text-xs text-white mt-2' size='sm'>Tambah Kategori</Button>
      
    </section>
  )
}


export default PustakawanTambahBuku