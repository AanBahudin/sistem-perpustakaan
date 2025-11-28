import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import RecomendationBook from './RecomendationBook'

const BookRecomendation = ({buku} : {buku: any }) => {

  return (
    <section className='w-full flex flex-col items-center justify-center mt-10'>

        <main className='w-full flex items-center justify-between'>
            <h1 className='font-semibold text-xl'>Rekomendasi Buku</h1>
            <Button asChild className='px-4 text-[12px] text-white' variant='secondary'>
                <Link to='/my/discovery/all' className='text-sm'>View All</Link>
            </Button>
        </main>

        <RecomendationBook data={buku} />
    </section>
  )
}

export default BookRecomendation