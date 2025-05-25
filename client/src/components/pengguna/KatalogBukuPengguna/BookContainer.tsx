import BookGrid from './BookGrid'
import BookPagination from './BookPagination'

const BookContainer = ({buku} : {buku:any}) => {
  return (
    <section className='w-full col-span-9'>
      <BookGrid buku={buku} />
      <BookPagination />
    </section>
  )
}

export default BookContainer