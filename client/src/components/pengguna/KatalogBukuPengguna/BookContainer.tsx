import BookGrid from './BookGrid'
import BookPagination from './BookPagination'

const BookContainer = ({buku, totalPage, disukai} : {buku:any, totalPage: number, disukai: any}) => {
  return (
    <section className='w-full col-span-12'>
      <BookGrid buku={buku} disukai={disukai} />
      <BookPagination totalPage={totalPage} />
    </section>
  )
}

export default BookContainer