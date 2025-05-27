import BookContainer from './BookContainer'

type KatalogSectionType = {
  dataBuku: Object[],
  page: number,
  total: number,
  disukai: any,
  savedData: any
}

const KatalogSection = ({dataBuku, total, disukai, savedData} : KatalogSectionType) => {

  return (
    <section className='grid grid-cols-12 min-h-[80vh] gap-x-4'>
        <BookContainer buku={dataBuku} totalPage={total} disukai={disukai} savedData={savedData} />
    </section>
  )
}

export default KatalogSection