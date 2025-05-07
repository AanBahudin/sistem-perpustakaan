import React from 'react'
import BookGrid from './BookGrid'
import BookPagination from './BookPagination'

const BookContainer = () => {
  return (
    <section className='w-full col-span-9'>
      <BookGrid />
      <BookPagination />
    </section>
  )
}

export default BookContainer