import { Link } from 'react-router-dom'
import { memo } from 'react'

type SearchBooksType = {
    data: any
}


const SearchBooks = ({ data }: SearchBooksType) => {
    const isDataEmpty = data.length === 0
    return (
        <section className='w-full flex items-center justify-start gap-x-5'>
            {isDataEmpty ? (
                <h1 className='font-semibold text-muted-foreground mt-20'>
                    Maaf, tidak bisa menemukan buku yang anda cari
                </h1>
            ) : (
                data.map((item: any, index: number) => (
                    <SearchBook item={item} key={index} />
                ))
            )}
        </section>
    )
}

export default memo(SearchBooks)

const SearchBook = ({item} : {item: any}) => {
    const newTitle =  item.judul.length > 15 ? item.judul.slice(0,15) + '...' : item.judul
    return (
        <Link to={`/my/buku/${item._id}`} className='w-fit'>
            <div key={item._id} className='w-full rounded-xl p-4 flex flex-col items-start justify-start'>
                <img src={item.cover} alt={item.title} className='w-[200px] bg-primary h-[200px] rounded-lg object-cover mx-auto' />
                <h1 className='font-bold text-md mt-2'>{newTitle}</h1>
                <p className='text-muted-foreground text-sm mt-1'>{item.penulis}</p>
            </div>
        </Link>
    )
}