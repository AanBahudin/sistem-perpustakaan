import { Link } from "react-router-dom"

const KatalogThumbnailImage = ({data} : {data: any}) => {
  return (
    <section className='flex items-center gap-x-6 mt-10 justify-center'>
      {data.map((item: any, index: number) => {
        return (
          <Link to={`/katalog/${item._id}`}>
            <img key={index} src={item.cover} className='lg:w-50 lg:h-70 w-30 h-50 object-cover rounded' />
          </Link>
        )
      })}
    </section>
  )
}

export default KatalogThumbnailImage