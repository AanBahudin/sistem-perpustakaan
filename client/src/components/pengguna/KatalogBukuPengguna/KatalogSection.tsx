import BookContainer from './BookContainer'

type KatalogSectionType = {
  total: number,
  dataBuku: any
}

const KatalogSection = ({total, dataBuku} : KatalogSectionType) => {

  return (
    <section className='grid grid-cols-12 min-h-[80vh] gap-x-4'>
        <BookContainer totalPage={total} buku={dataBuku}/>
    </section>
  )
}

export default KatalogSection