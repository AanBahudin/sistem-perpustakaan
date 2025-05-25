import FilterSection from './FilterSection'
import BookContainer from './BookContainer'

type KatalogSectionType = {
  dataBuku: Object[],
  page: number,
  total: number
}

const KatalogSection = ({dataBuku, page = 1, total} : KatalogSectionType) => {
  return (
    <section className='grid grid-cols-12 gap-x-4'>
        <FilterSection />
        <BookContainer buku={dataBuku} />
    </section>
  )
}

export default KatalogSection