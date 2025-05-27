import BookContainer from './BookContainer'

type KatalogSectionType = {
  dataBuku: Object[],
  page: number,
  total: number,
  disukai: any
}

const KatalogSection = ({dataBuku, total, disukai} : KatalogSectionType) => {

  return (
    <section className='grid grid-cols-12 min-h-[80vh] gap-x-4'>
        <BookContainer buku={dataBuku} totalPage={total} disukai={disukai} />
    </section>
  )
}

export default KatalogSection