import BookGrid from './BookGrid'
import BookPagination from './BookPagination'

const BookContainer = ({buku, totalPage, disukai, savedData} : {buku:any, totalPage: number, disukai: any, savedData: any}) => {
  return (
    <section className='w-full col-span-12'>
      <BookGrid buku={buku} disukai={disukai} disimpan={savedData} />
      <BookPagination totalPage={totalPage} />
    </section>
  )
}

export default BookContainer