import BookGrid from './BookGrid'
import BookPagination from './BookPagination'

const BookContainer = ({totalPage} : {totalPage: number}) => {
  return (
    <section className='w-full col-span-12'>
      <BookGrid />
      <BookPagination totalPage={totalPage} />
    </section>
  )
}

export default BookContainer