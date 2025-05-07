import React from 'react'
import FilterSection from './FilterSection'
import BookContainer from './BookContainer'

const KatalogSection = () => {
  return (
    <section className='grid grid-cols-12'>
        <FilterSection />
        <BookContainer />
    </section>
  )
}

export default KatalogSection