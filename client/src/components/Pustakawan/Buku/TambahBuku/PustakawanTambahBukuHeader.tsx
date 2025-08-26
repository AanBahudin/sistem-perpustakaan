import { BookOpenText, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

const PustakawanTambahBukuHeader = () => {
  return (
    <section className='w-full flex items-center justify-center my-10'>
      <main className='flex-1 flex items-center justify-start gap-x-4'>
        <BookOpenText className='w-6 h-6' />
        <h1 className='font-light text-xl'>Tambah Buku Baru</h1>
      </main>
      <Button type='submit' className='flex items-center justify-center gap-x-2 text-white text-xs font-normal leading-4'>
        <CheckCircle className='w-4 h-4' />
        Simpan Buku
      </Button>
    </section>
  )
}

export default PustakawanTambahBukuHeader