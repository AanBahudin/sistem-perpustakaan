import { CarouselItem } from '@/components/ui/carousel'
import { Link } from 'react-router-dom'
const KategoryCard = ({data} : {data: any}) => {

    const baseURL = '/my/discovery/category?q='
    return (
        <>
            {data.map((item:any, index:number) => {
                let newTitle : string = item.nama
                if (newTitle.length > 15) {
                    newTitle = `${newTitle.slice(0, 12) }...`
                }
                return (
                    <CarouselItem key={index} className="basis-1/6 flex">
                        <div className='w-full flex flex-col items-center justify-center p-4 rounded-xl border hover:border-primary duration-150 ease-in-out'>
                            <Link to={`${baseURL}${item.nama}`} className='font-semibold text-center cursor-default'>{newTitle}</Link>
                        </div>
                    </CarouselItem>
                )
            })}
        </>
    )
}

export default KategoryCard