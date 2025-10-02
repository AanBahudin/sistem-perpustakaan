import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useSelector } from 'react-redux'
import { setDeskripsiBuku, setJudulBuku, setTaglineBuku } from '@/cart/pustakawanTambahBukuSlice'
import { store } from '@/store'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const GeneralInfoContainerEdit = ({buku} : {buku: any}) => {
  const {idBuku} = useParams()

  const {  judulBuku, taglineBuku, deskripsiBuku } = useSelector((state: any) => state.pustakawanTambahBukuState)

  const handleJudulBuku = (e: any) => {
    store.dispatch(setJudulBuku(e.target.value))
  }
  
  const handleTaglineBuku = (e: any) => {
    store.dispatch(setTaglineBuku(e.target.value))
  }

  const handleDeskripsiBuku = (e: any) => {
    store.dispatch(setDeskripsiBuku(e.target.value))
  }

  useEffect(() => {
    store.dispatch(setJudulBuku(buku.judul))
    store.dispatch(setTaglineBuku(buku.tagline))
    store.dispatch(setDeskripsiBuku(buku.deskripsi))
  }, [idBuku])

  return (
    <section className='w-full p-4 rounded-xl bg-accent/10'>
      <h1 className='text-lg font-semibold mb-4'>Informasi Umum</h1>

      <main className='w-full flex flex-col gap-y-2 mb-2'>
        <div className='w-full flex items-center justify-between'>
          <Label htmlFor='judul' className='text-xs font-normal'>Judul Buku</Label>
          <p className='text-muted-foreground text-[11px]'>{judulBuku.length} / 200</p>
        </div>
        <Input max={200} name='judul' id='judul' defaultValue={buku.judul} value={judulBuku} onChange={handleJudulBuku} required autoFocus className='w-full !text-xs placeholder:text-xs border-none' placeholder='Algoritma dan Struktur Data' />
      </main>

      <main className='w-full flex flex-col gap-y-2 mb-2'>
        <div className='w-full flex items-center justify-between'>
          <Label htmlFor='tagline' className='text-xs font-normal'>Tagline Buku</Label>
          <p className='text-muted-foreground text-[11px]'>{taglineBuku.length} / 500</p>
        </div>
        <Textarea maxLength={500} defaultValue={buku.tagline} value={taglineBuku} onChange={handleTaglineBuku} name='tagline' id='tagline' required className='w-full !text-xs border-none resize-none' placeholder='Ringkasan unik yang menggambarkan inti buku'></Textarea>
      </main>

      <main className='w-full flex flex-col gap-y-2 mb-4'>
        <div className='w-full flex items-center justify-between'>
          <Label className='text-xs font-normal'>Deskripsi Buku</Label>
          <p className='text-muted-foreground text-[11px]'>{deskripsiBuku.length} / 1000</p>
        </div>
        <Textarea maxLength={1000} defaultValue={buku.deskripsi} value={deskripsiBuku} onChange={handleDeskripsiBuku} name='deskripsi' id='deskripsi' required placeholder='Jelaskan secara singkat topik, alur, atau pesan utama yang disampaikan' className='w-full !text-xs border-none min-h-[25vh]'></Textarea>
      </main>

      <main className='w-full flex items-center justify-between gap-x-4'>
        <div className='w-1/2 flex flex-col gap-y-1 mb-2'>
          <Label htmlFor='penulis' className='text-xs font-normal'>Penulis Buku</Label>
          <p className='text-[10px] text-muted-foreground'>Tambahkan informasi penulis buku</p>
          <Input defaultValue={buku.penulis} name='penulis' id='penulis' required className='w-full !text-xs placeholder:text-xs border-none' placeholder='Pramoedya Ananta Toer' />
        </div>

        <div className='w-1/2 flex flex-col gap-y-1 mb-2'>
          <Label htmlFor='penerbit' className='text-xs font-normal'>Penerbit Buku</Label>
          <p className='text-[10px] text-muted-foreground'>Tambahkan informasi penerbit buku</p>
          <Input defaultValue={buku.penerbit} name='penerbit' id='penerbit' required className='w-full !text-xs placeholder:text-xs border-none' placeholder='Gramedia Pustaka Utama' />
        </div>
      </main> 
    </section>
  )
}

export default GeneralInfoContainerEdit