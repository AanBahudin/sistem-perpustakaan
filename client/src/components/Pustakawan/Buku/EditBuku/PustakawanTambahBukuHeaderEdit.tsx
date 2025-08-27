import { BookOpenText, Loader, Save } from 'lucide-react'
import { Button } from '@/components/ui/button'

const PustakawanTambahBukuHeaderEdit = ({isLoading = false} : {isLoading: boolean}) => {
  return (
    <section className='w-full flex items-center justify-center my-10'>
      <main className='flex-1 flex items-center justify-start gap-x-4'>
        <BookOpenText className='w-6 h-6' />
        <h1 className='font-light text-xl'>Update Data Buku</h1>
      </main>
      <Button disabled={isLoading} type='submit' className='flex min-w-[120px] items-center justify-center gap-x-2 text-white text-xs font-normal leading-4'>
        {isLoading ? <Loader className='w-4 h-4 animate-spin' /> : <Save className='w-4 h-4' />}
        {isLoading ? 'Memperbaharui' : 'Update'}
        
      </Button>
    </section>
  )
}

export default PustakawanTambahBukuHeaderEdit