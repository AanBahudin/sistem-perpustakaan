import BookGrid from './BookGrid'
import BookPagination from './BookPagination'

const BookContainer = ({buku, totalPage} : {buku:any, totalPage: number}) => {
  return (
    <section className='w-full col-span-12'>
      <BookGrid buku={buku} />
      <BookPagination totalPage={totalPage} />
    </section>
  )
}

export default BookContainer