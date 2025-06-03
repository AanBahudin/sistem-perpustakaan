import BookContainer from './BookContainer'

type KatalogSectionType = {
  total: number,
}

const KatalogSection = ({total} : KatalogSectionType) => {

  return (
    <section className='grid grid-cols-12 min-h-[80vh] gap-x-4'>
        <BookContainer totalPage={total}/>
    </section>
  )
}

export default KatalogSection