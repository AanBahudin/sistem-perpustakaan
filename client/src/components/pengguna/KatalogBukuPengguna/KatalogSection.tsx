import BookContainer from './BookContainer'

type KatalogSectionType = {
  dataBuku: Object[],
  page: number,
  total: number
}

const KatalogSection = ({dataBuku, page = 1, total} : KatalogSectionType) => {
  return (
    <section className='grid grid-cols-12 min-h-[80vh] gap-x-4'>
        <BookContainer buku={dataBuku} totalPage={total} />
    </section>
  )
}

export default KatalogSection