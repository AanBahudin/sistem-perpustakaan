import FilterSection from './FilterSection'
import BookContainer from './BookContainer'

const KatalogSection = () => {
  return (
    <section className='grid grid-cols-12 gap-x-4'>
        <FilterSection />
        <BookContainer />
    </section>
  )
}

export default KatalogSection