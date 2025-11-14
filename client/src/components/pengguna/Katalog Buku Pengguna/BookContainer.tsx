import { Button } from '@/components/ui/button'
import BookGrid from './BookGrid'
import { Link } from 'react-router-dom'

const BookContainer = ({totalPage, buku} : {totalPage: number, buku: any}) => {

  const baseURL = '/my/discovery/all'

  return (
    <section className='w-full col-span-12 flex flex-col'>
      <BookGrid dataBuku={buku.buku || buku} />
      <Button variant='link' size='lg' asChild className='w-fit mt-16 mx-auto border text-white text-sm px-10'>
        <Link to={totalPage > 1 ? `${baseURL}?page=2` : baseURL}>Muat Lainnya</Link>
      </Button>
    </section>
  )
}

export default BookContainer